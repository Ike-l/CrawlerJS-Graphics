export default class SVGShape {
    constructor(params={}) {

        if (arguments["1"]) {
            for (const [att, val] of Object.entries(arguments["1"])) {
                this[att] = val
            }
            for (const [placement, invalidArg] of Object.entries(arguments).slice(2)) {
                console.warn(`Invalid argument passed to Shape! "${invalidArg}" at index ${placement}`)
            }
        }
        
        this.NameSpace = "http://www.w3.org/2000/svg"
        this.parent = params.parent || { element: document.documentElement }
        this.type = params.type
        this.EditButtons = []
        
        this.X = params.x || 0
        this.Y = params.y || 0
        this.CenterX = params.cx || 0
        this.CenterY = params.cy || 0

        this.FillColor = params.fill || "#0f0f0f"
        this.StrokeColor = params.stroke || "#0d0d0d"
        this.StrokeWidth = params.strokeWidth || "1"


        this.scale = params.scale || [1, 1]
        this.rotation = params.rotation || 0
        this.translation = params.translation || [0, 0]

        this.Function = params.func || {}
        this.Args = params.arguments || {}
        this.FuncAttributes = params.attributes || {}
        
        this.relativePositions = []
        if (params.defaultButtons == undefined || params.defaultButtons == true ) {
            this.relativePositions.push(
                {x: 0.5, y: 1, shape: "rect", width: 50, height: 50, directionX: 0, directionY: 1, ButtonType: "scale",color:"blue"},
                {x: 1, y: 0.5, shape: "rect", width: 50, height: 50, directionX: 1, directionY: 0, ButtonType: "scale", color:"blue"},
                {x: 0.5, y: 0, shape: "circle", width: 50, height: 50, ButtonType: "rotate", color: "orange"},
             //{x: 0, y: 1, shape: "circle", width: 50, height: 50, directionX: -1, directionY: 1, ButtonType: "scale", Color: "brown"},
            )
        }

        if (this.Function["main"]) {
            this.pushPositions(Object.entries(this.Function).slice(1))
        } else {
            this.pushPositions(Object.entries(this.Function))
        }

            
        
        this.classes = {}

        this.PreviousMouseX
        this.PreviousMouseY
        this.Clicked = false
        this.buttonDrag = false
        this.matrix
        this.bbox
        this.mainFlag = true

        this.dblClickPeriod = 1000
        this.lastClicked = performance.now()-this.dblClickPeriod
        this.currentLine = 0
        this.currentCharacter = 0
        this.textLines = []
        this.text // class 
        this.textString = ""
        this.editingText = false
        this.keyExclusion = [
            "Shift",
            "Control",
            "Alt",
            "ArrowRight",
            "ArrowLeft",
            "ArrowUp",
            "ArrowDown",
            "Insert",
            "Backspace",
            "Enter",
            "Home",
            "End",
            "PageUp",
            "PageDown",
            "Delete",
            "End",
            "Meta",
            "Tab",
        ]
        this.keyActions = [
            "Backspace",
            "ArrowDown",
            "ArrowUp",
            "ArrowRight",
            "ArrowLeft",
            "Enter",
            "Delete",
        ]
        this.keyActionMappings = {
                "Backspace": () => this.handleBackspace(),
                "ArrowDown": () => this.handleVerticalArrows(1),
                "ArrowUp": () => this.handleVerticalArrows(-1),
                "ArrowRight": () => this.handleHorizontalArrows(1),
                "ArrowLeft": () => this.handleHorizontalArrows(-1),
                "Enter": (evt) => this.handleEnter(evt.shiftKey),
                "Delete": () => this.handleDelete(),

        
            }
        this.Build()

        this.element.onmousedown = this.MouseDown.bind(this)
        this.bindMouseMove = this.MouseMove.bind(this)
        this.element.onmouseup = this.MouseUp.bind(this)
        this.bindDBLClick = this.EditText.bind(this)
        this.bindWriteText = this.WriteText.bind(this)
        this.bindRemoveEditing = this.RemoveEditing.bind(this)
        this.element.onclick = this.Click.bind(this)
        //this.element.ondblclick = this.EditText.bind(this)

        this.GetShapesForButtons().then(() => {
            this.PopulateEditButtons()
        })
        setTimeout(() => {
            this.syncTransformation()
        }, 0)
    }
    syncState() {
        this.updateCenter()
        this.syncTransformation()
        this.updateEditButtons()
        this.updateText()
    }
    Build() {
        // .. Carry on from shape Build() 
        
        
        this.element.setAttribute("fill", this.FillColor)
        this.element.setAttribute("stroke", this.StrokeColor)
        this.element.setAttribute("stroke-width", this.StrokeWidth)
        this.element.setAttribute("pointer-events", "auto")
        
        this.parent.element.appendChild(this.element)
    }
    async GetShapesForButtons() {
        const SVGRectangleEditButtonModule = await import("../Child/Shape/SVGRectangleEditButton.js")
        //console.log("rect imported")
        const SVGCircleEditButtonModule = await import("../Child/Shape/SVGCircleEditButton.js")
        //console.log("circle imported")
        const SVGGroupModule = await import ("./SVGGroup.js")
        //console.log("g imported")
        const SVGTextModule = await import ("./SVGText.js")
        //console.log("text imported")
        const SVGTextSpanModule = await import ("../Child/Text/SVGTextSpan.js")
        this.classes["rect"] = SVGRectangleEditButtonModule.default
        //console.log("rect set")
        this.classes["circle"] = SVGCircleEditButtonModule.default
        //console.log("circle set")
        this.classes["g"] = SVGGroupModule.default
        //console.log("g set")
        this.classes["text"] = SVGTextModule.default
        //console.log("text set")
        this.classes["textSpan"] = SVGTextSpanModule.default
        //console.log("text span set")
        
    }
    pushPositions(functions) {
        for (const [tag, func] of functions) {
            this.relativePositions.push(
                {
                    x:this.FuncAttributes[tag].x||0,
                    y:this.FuncAttributes[tag].y||0.5,
                    shape:this.FuncAttributes[tag].shape||"rect",
                    width:this.FuncAttributes[tag].width||50,
                    height:this.FuncAttributes[tag].height||50,
                    color:this.FuncAttributes[tag].fill||"orange",
                    ButtonType:"function",
                    function:func,
                    arguments:this.Args[tag],
                    tag: tag
                }
            )
        }
    }
    PopulateEditButtons() {
        const bbox = this.updateCenter()
        const groupClass = this.classes["g"]
        const group = new groupClass({parent:this.parent})
        this.EditButtons = this.relativePositions.map(pos => {
            const shape = pos.shape
            const Shape = this.classes[shape]
            const width = pos.width 
            const height = pos.height
            const Xd = pos.directionX
            const Yd = pos.directionY
            const x = bbox.x + pos.x*bbox.width 
            const y = bbox.y + pos.y*bbox.height 
            const ButtonType = pos.ButtonType
            const ButtonColor = pos.color
            const func = pos.function 
            const args = pos.arguments
            const tag = pos.tag
            const isCircle = shape=="circle" ? 0.5 : 1
            if (shape=="rect") {
                return new Shape({tag: tag, function: func, arguments: args, fill: ButtonColor, x: x, y: y, parent: this, parentElement: group, width: width*isCircle, height: height*isCircle, directionX: Xd, directionY: Yd, ButtonType: ButtonType})
            }
            if (shape=="circle") {
                return new Shape({tag: tag, function: func, arguments: args, fill: ButtonColor, x: x, y: y, parent: this, parentElement: group, radius: width*isCircle, directionX: Xd, directionY: Yd, ButtonType: ButtonType})
            }
        })
    }
    updateEditButtons() {
        const bbox = this.updateCenter()
        this.EditButtons.forEach((button, index) => {
            const pos = this.relativePositions[index]
            const x = bbox.x + pos.x*bbox.width 
            const y = bbox.y + pos.y*bbox.height 
            
            const Point = vec2.fromValues(x, y)

            const transformedPoint = vec2.create()
            vec2.transformMat2d(transformedPoint, Point, this.matrix)
            const isCircle = pos.shape=="circle" ? 0 : 1
            button.setPosition(transformedPoint[0] - (isCircle*pos.width/2), transformedPoint[1] - (isCircle*pos.height/2))
        })
    }
    MouseDown(evt) {
        this.Clicked = 1 - this.Clicked
        
        this.PreviousMouseX = evt.clientX
        this.PreviousMouseY = evt.clientY
        this.buttonDrag = false
        document.addEventListener("mousemove", this.bindMouseMove)
        this.parent.element.removeChild(this.element)
        this.parent.element.appendChild(this.element)
        this.DisplayPoints()
        // double click
        if (performance.now()-this.lastClicked < this.dblClickPeriod) {
            this.EditText(evt)
            this.lastClicked = performance.now()-this.dblClickPeriod
        } else {
            this.lastClicked = performance.now()
        }
    }
    DisplayPoints() {
        this.updateEditButtons()
        this.EditButtons.forEach(x => {
            x.Display()
        })
    }
    RemovePoints() {
        this.EditButtons.forEach(x => {
            x.Remove()
        })
    }
    MouseMove(evt) {
        if (this.buttonDrag) return
        if (!evt.buttons == 1) {
            this.PreviousMouseX = evt.clientX
            this.PreviousMouseY = evt.clientY
            return
        }
        const movementX = (evt.clientX - this.PreviousMouseX) || 0
        const movementY = (evt.clientY - this.PreviousMouseY) || 0
        
        this.PreviousMouseX = evt.clientX
        this.PreviousMouseY = evt.clientY
        
        this.translate([movementX, movementY])
    }
    MouseUp(evt) {
        if (!this.Clicked) {
            this.RemovePoints()
        }

        document.removeEventListener("mousemove", this.bindMouseMove)
        this.Click()
        this.syncState()
    }
    Click() {
        if (this.Function["main"]) { 
            if (this.mainFlag) {
                this.Function["main"].call(this, ...this.Args["main"])
            }
            this.mainFlag = !this.mainFlag
        }
    }
    initText() {
        const groupClass = this.classes["g"]
        this.textGroup = new groupClass ({parent:this.parent})      
        this.addLine()
    }
    updateText() {
        if (this.textLines.length <= 0) return
        const bbox = this.updateCenter()
        const pos = vec2.fromValues(bbox.x, bbox.y)
        const transformedPos = vec2.create()
        vec2.transformMat2d(transformedPos, pos, this.matrix)
        
        let offset = 0
        for (const text of this.textLines) {
            text.setPosition(transformedPos[0], transformedPos[1]+offset)
            const size = text.fontSize
            offset += parseFloat(size)
        }
        
        this.textGroup.parent.element.removeChild(this.textGroup.element)
        this.textGroup.parent.element.appendChild(this.textGroup.element)
    }
    EditText(evt) {
        if (this.textLines.length==0) this.initText()
        this.syncState()
        this.editingText = !this.editingText
        if (this.editingText) {
            document.addEventListener("keydown", this.bindWriteText)
            document.addEventListener("mousedown", this.bindRemoveEditing)
            this.shouldRemoveEventFlag = performance.now()
        }
    }
    RemoveEditing(evt) {
        if (performance.now()-this.shouldRemoveEventFlag < 1) {
            return
        }
        this.editingText = !this.editingText
        this.syncState()
        document.removeEventListener("mousedown", this.bindRemoveEditing)
        document.removeEventListener("keydown", this.bindWriteText)
    }
    addLine() {
        this.textLines.push( new this.classes["text"]({parent: this, parentElement: this.textGroup}) )
        this.updateText()
    }
    handleBackspace() {
        this.updateLineText("", true)
    }
    handleHorizontalArrows(movement) {
        this.currentCharacter = Math.max(this.currentCharacter+movement, 0)
    }
    handleVerticalArrows(movement) {
        this.currentLine = Math.max(this.currentLine+movement, 0)
        this.currentLine = Math.min(this.currentLine, this.textLines.length-1)
    }
    handleEnter(shiftFlag) {
        if (shiftFlag) {
            this.currentLine++
            this.currentCharacter = 0
            this.addLine()
        }
    }
    handleDelete() {
        this.updateLineText("", false, true)
    }
    updateLineText(key="", backspaced, deleted) {
        const currentLine = this.textLines[this.currentLine]
        const { text } = currentLine

        let newText
        if (backspaced) {
            newText = text.slice(0, this.currentCharacter-1) + text.slice(this.currentCharacter)
            this.currentCharacter = Math.max(this.currentCharacter-1, 1)
        } else if (deleted) {
            newText = text.slice(0, this.currentCharacter) + text.slice(this.currentCharacter+ 1)
        } else {
            this.currentCharacter++
            newText = text.slice(0, this.currentCharacter-1) +key+text.slice(this.currentCharacter-1)
        }
        
        currentLine.WriteLine(newText)
    }
    WriteText(evt) {
        if (evt.key in this.keyActionMappings) {
            this.keyActionMappings[evt.key](evt)
        } 
        else if (this.keyExclusion.includes(evt.key)) {
            return
        } else {
            this.updateLineText(evt.key)
        }
    }
    setParent(parent) {
        this.parent = parent
        this.parent.element.appendChild(this.element)
    }
    removeParent() {
        this.parent.element.removeChild(this.element)
        this.parent = undefined
    }
    remove() {
        this.removeParent()
        this.RemovePoints()
    }
    createTransformationMatrix() {
        const matrix = mat2d.create()
        console.log("Center:", this.CenterX, this.CenterY)
        mat2d.translate(matrix, matrix, [this.translation[0]+this.CenterX, this.translation[1]+this.CenterY])
        mat2d.rotate(matrix, matrix, this.rotation)
        mat2d.scale(matrix, matrix, [this.scale[0], this.scale[1]])
        mat2d.translate(matrix, matrix, [-this.CenterX, -this.CenterY])
        this.matrix = matrix
    }
    stringifyM(matrix) {
        return `matrix(${matrix.join(' ')})`
    }
    syncTransformation() {
        this.createTransformationMatrix()
        this.element.setAttribute("transform", this.stringifyM(this.matrix))
    }
    rotate(rads) {
        this.rotation = (this.rotation+rads) %(2*Math.PI)
        this.syncState()
    }
    translate([translationX, translationY]) {
        this.translation[0] += translationX
        this.translation[1] += translationY
        this.syncState()
    }
    stretchButton(deltaX, deltaY, directionX, directionY) {
        const rotatedDeltaX = deltaX*Math.cos(-this.rotation)-deltaY*Math.sin(-this.rotation)
        const rotatedDeltaY = deltaX*Math.sin(-this.rotation)+deltaY*Math.cos(-this.rotation)

        const scaleFactorX = this.scale[0] + (rotatedDeltaX * directionX)  // need to multiply by height / width then rotate it
        const scaleFactorY = this.scale[1] + (rotatedDeltaY * directionY) // need to multiply by width / height then rotate it
        console.log(scaleFactorX, scaleFactorY)
        this.scale = [scaleFactorX, scaleFactorY]
        
        this.syncState()
    }
    ExpStretch([scaleX, scaleY]) {
        const scaleFactorX = this.scale[0]*scaleX
        const scaleFactorY = this.scale[1]*scaleY
        this.scale = [scaleFactorX, scaleFactorY]
        this.syncState()
    }
    LinStretch([scaleX, scaleY]) {
        // scaleX and scaleY must be % of the body 
        // div by 3 cause it produces the extra on both sides?
        const scaleFactorX = this.scale[0] + (this.initialWidth+scaleX)/ (this.initialWidth*3)
        const scaleFactorY = this.scale[1] + (this.initialHeight+scaleY)/ (this.initialHeight*3) 
        this.scale = [scaleFactorX, scaleFactorY]
        this.syncState()
    }
    getCurrentCenter() {
        this.syncState()
        const Center = vec2.fromValues(this.CenterX, this.CenterY)
        const CurrentCenter = vec2.create()
        vec2.transformMat2d(CurrentCenter, Center, this.matrix)
        return CurrentCenter
    }
    updateCenter() {
        this.bbox = this.element.getBBox()
        this.CenterX = this.bbox.x + this.bbox.width / 2
        this.CenterY = this.bbox.y + this.bbox.height / 2
        return this.bbox
    }
}