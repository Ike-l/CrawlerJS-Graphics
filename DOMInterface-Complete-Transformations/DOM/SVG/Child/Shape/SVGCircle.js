import SVGShape from "../../Parent/SVGShape.js"

export default class SVGCircle extends SVGShape {
    constructor(params = {}) {
        params.type = "circle"
        const attributes = {
            // *2 cause diameter
            "width": params.radius*2 || 0,
            "height": params.radius*2 || 0,
            "initialWidth": params.radius*2 || 0,
            "initialHeight": params.radius*2 || 0,
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
}
