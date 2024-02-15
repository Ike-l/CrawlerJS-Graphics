import Element from "../Parent/Element.js"

export default class Canvas extends Element {
    constructor(params = {}) {
        super(params)
        this.ObjectBuffer = this.ObjectBuffer || []
    }
    Build() {
        this.zIndex = this.zIndex || 1
        this.element = document.createElement("CANVAS")
        this.canvasContext = this.element.getContext(this.context)
        this.element.width = this.width
        this.element.height = this.height
        super.Build()
    }
    Background() {
        this.canvasContext.beginPath()
        this.canvasContext.fillStyle = "red"
        this.canvasContext.fillRect(0, 0, this.width, this.height)
       // console.log(this.width, this.height)
        //console.log(this.canvasContext)
        this.canvasContext.stroke()
    }
    Draw() {
        this.Background()
        this.ObjectBuffer.forEach(x => {
            x.Draw()
        })
    }
}