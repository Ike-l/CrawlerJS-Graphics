export default class SVGEditButton {
    constructor(params={}) {
        for (const [att, val] of Object.entries(arguments["1"])) {
            this[att] = val
        }

        for (const [placement, invalidArg] of Object.entries(arguments).slice(2)) {
            console.warn(`Invalid argument passed to Shape! "${invalidArg}" at index ${placement}`)
        }
        
        this.NameSpace = "http://www.w3.org/2000/svg"
        this.parent = params.parent || { element: document.documentElement }
        this.parentElement = params.parentElement || { element: document.documentElement }
        this.type = params.type
        this.ButtonType = params.ButtonType
        
        this.X = params.x || 0
        this.Y = params.y || 0
        this.CenterX = params.cx || 0
        this.CenterY = params.cy || 0
        this.directionX = params.directionX
        this.directionY = params.directionY

        this.FillColor = params.fill || "#0f0f0f"
        this.StrokeColor = params.stroke || "#0d0d0d"
        this.StrokeWidth = params.strokeWidth || "1"


        this.tag = params.tag
        this.Function = params.function
        this.Args = params.arguments || []
        this.PreviousMouseX
        this.PreviousMouseY
        this.Clicked = false
        this.matrix = params.matrix
        this.bbox
        this.displayed = false
        
        
        
        this.Build()

        this.element.onmousedown = this.MouseDown.bind(this)
        this.bindMouseMove = this.MouseMove.bind(this)
        this.bindMouseUp = this.MouseUp.bind(this)
    }
    Build() {
        
        
        this.element.setAttribute("fill", this.FillColor)
        this.element.setAttribute("stroke", this.StrokeColor)
        this.element.setAttribute("stroke-width", this.StrokeWidth)
        
    }
    Display() {
        if (this.parentElement.type == "g") { 
            this.parent.parent.element.removeChild(this.parent.element)
            this.parent.parent.element.appendChild(this.parent.element)
            this.parentElement.parent.element.removeChild(this.parentElement.element)
            this.parentElement.parent.element.appendChild(this.parentElement.element)
        }
        this.parentElement.element.appendChild(this.element)
        this.displayed = true
    }
    Remove() {
        if (this.displayed) this.parentElement.element.removeChild(this.element)
        this.displayed = false
    }
    MouseDown(evt) {
        this.Clicked = 1 - this.Clicked
        if (this.parentElement.type == "g") {
            // if that parent is a group -> parent is a group recursively
            
            this.parent.parent.element.removeChild(this.parent.element)
            this.parent.parent.element.appendChild(this.parent.element)
            this.parentElement.parent.element.removeChild(this.parentElement.element)
            this.parentElement.parent.element.appendChild(this.parentElement.element)
        }
        this.parentElement.element.removeChild(this.element)
        this.parentElement.element.appendChild(this.element)

        if (this.parent.textGroup) {
           this.parent.textGroup.parent.element.removeChild(this.parent.textGroup.element)
           this.parent.textGroup.parent.element.appendChild(this.parent.textGroup.element)
        }
        
        this.PreviousMouseX = evt.clientX
        this.PreviousMouseY = evt.clientY
        document.addEventListener("mousemove", this.bindMouseMove)
        document.addEventListener("mouseup", this.bindMouseUp)
    }
    MouseMove(evt) {
        if (!this.PreviousMouseX) this.PreviousMouseX = evt.clientX
        if (!this.PreviousMouseY) this.PreviousMouseY = evt.clientY
        if (!evt.buttons == 1) return
        
        // found from messing around, saw that 50 was half the width/height 
        const movementX = (evt.clientX - this.PreviousMouseX) 
        const movementY = (evt.clientY - this.PreviousMouseY) 
        console.log(movementX, movementY)
        if (this.ButtonType == "scale") {
            const sfxScale = this.parent.width/2
            const sfyScale = this.parent.height/2
            console.log(this.parent.width)
            console.log(this.parent.height)
            this.parent.stretchButton(movementX / sfxScale, movementY / sfyScale, this.directionX, this.directionY)
        }
        if (this.ButtonType == "rotate") this.parent.rotate(this.getAngle(movementX, movementY))
        
        this.PreviousMouseX = evt.clientX
        this.PreviousMouseY = evt.clientY
        
        this.parent.buttonDrag = true
    }
    getAngle(movementX, movementY) {
        // Get transformed center
        const centerPoint = this.parent.getCurrentCenter()
        // Convert the point of initial to a direction vector
        const oldPoint = vec2.fromValues(this.PreviousMouseX, this.PreviousMouseY)
        const oldPointDirection = vec2.create()
        // from the center of the shape
        vec2.subtract(oldPointDirection, oldPoint, centerPoint)
        
        // Convert the point of initial to a direction vector
        const newPoint = vec2.fromValues(this.PreviousMouseX+movementX, this.PreviousMouseY+movementY)
        const newPointDirection = vec2.create()
        // from the center of the shape
        vec2.subtract(newPointDirection, newPoint, centerPoint)

        // get the sign since all angles are positive
        const crossProduct = oldPointDirection[0] * newPointDirection[1] - oldPointDirection[1] * newPointDirection[0]
        const sign = Math.sign(crossProduct)
        
        const angle = vec2.angle(newPointDirection, oldPointDirection) * sign
        return angle
    }
    Click() {
        if (this.Function) {
            this.Function.call(this, ...this.Args)
        }
    }
    MouseUp(evt) {
        document.removeEventListener("mousemove", this.bindMouseMove)
        document.removeEventListener("mouseup", this.bindMouseUp)
        if (this.Function) this.Click()
    }
    setParent(parent) {
        this.parent = parent
        this.parentElement.element.appendChild(this.element)
    }
    removeParent(parent) {
        this.parentElement.element.removeChild(this.element)
        this.parent = undefined
    }
    setSize(width, height) {
        this.width = width
        this.height = height
        console.log(".setSize(). Only use on rectangles!")
        this.element.setAttribute("width", this.width)
        this.element.setAttribute("height", this.height)
    }
}
