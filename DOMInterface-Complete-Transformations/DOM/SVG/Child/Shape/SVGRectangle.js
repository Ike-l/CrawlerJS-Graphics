import SVGShape from "../../Parent/SVGShape.js"

export default class SVGRectangle extends SVGShape {
    constructor(params = {}) {
        params.type = "rect"
        const attributes = {
            "width": params.width || 0,
            "height": params.height || 0,
            "initialWidth": params.width || 0,
            "initialHeight": params.height || 0,
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
}
