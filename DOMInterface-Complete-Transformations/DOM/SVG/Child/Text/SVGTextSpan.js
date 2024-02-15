import SVGText from "../../Parent/SVGText.js"

export default class SVGTextSpan extends SVGText {
    constructor(params = {}) {
        params.type = "tspan"
        const attributes = {
            //"lineNumber": params.lineNumber || 0,
        }
        super(params, attributes)
    }
    Build() {
        this.element = document.createElementNS(this.NameSpace, this.type)

        this.element.setAttribute("x", "10px")
        this.element.setAttribute("y", "10px")
        this.element.setAttribute("dy", "10px")
        //this.element.setAttribute("dy", this.lineNumber*parseFloat(this.fontSize)+2*parseFloat(this.fontSize))

        this.element.setAttribute("font-size", this.fontSize)
        
        this.element.setAttribute("fill", this.fillColor)
        this.element.setAttribute("stroke-width", this.strokeWidth)
        
        this.element.textContent = this.text

        this.parent.element.appendChild(this.element)

        //console.log(this.parent)
    }
}