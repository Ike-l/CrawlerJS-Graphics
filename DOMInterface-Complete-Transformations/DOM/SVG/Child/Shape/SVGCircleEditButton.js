import SVGEditButton from "../../Parent/SVGEditButton.js"

export default class SVGCircle extends SVGEditButton {
    constructor(params = {}) {
        params.type = "circle"
        const attributes = {
            // *2 cause diameter
           // "width": params.radius*2 || 0,
           // "height": params.radius*2 || 0,
            "radius": params.radius || 0,
        }
        super(params, attributes)
    }
    Build() {
        this.element = document.createElementNS(this.NameSpace, this.type)
        this.element.setAttribute("cx", this.X)
        this.element.setAttribute("cy", this.Y)
        this.element.setAttribute("r", this.radius)
        super.Build()
    }
    setPosition(x, y) {
        this.X = x
        this.Y = y
        this.element.setAttribute("cx", this.X)
        this.element.setAttribute("cy", this.Y)
    }
}
