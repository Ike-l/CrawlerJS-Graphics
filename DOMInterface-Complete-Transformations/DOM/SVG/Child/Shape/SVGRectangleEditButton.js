import SVGEditButton from "../../Parent/SVGEditButton.js"

export default class SVGRectangleEditButton extends SVGEditButton {
    constructor(params = {}) {
        params.type = "rect"
        const attributes = {
            "width": params.width || 0,
            "height": params.height || 0,
        }
        super(params, attributes)
    }
    Build() {
        this.element = document.createElementNS(this.NameSpace, this.type)
        this.element.setAttribute("x", this.X)
        this.element.setAttribute("y", this.Y)
        this.element.setAttribute("width", this.width)
        this.element.setAttribute("height", this.height)
        super.Build()
    }
    setPosition(x, y) {
        this.X = x
        this.Y = y
        this.element.setAttribute("x", this.X)
        this.element.setAttribute("y", this.Y)
    }
}