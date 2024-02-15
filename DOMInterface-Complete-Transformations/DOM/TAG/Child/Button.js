import Element from "../Parent/Element.js"

export default class Button extends Element{
    constructor(params ={}) {
        super(params)
    }
    Build() {
        this.zIndex = this.zIndex || 3
        this.element = document.createElement("BUTTON")
        this.element.onclick = this.onClick.bind(this)
        super.Build()
    }
    onClick(event) {
        if (this.func) {
            const args = this.funcArgs || []
            this.func.call(this, event, ...args)
        }
    }
}