import Element from "../Parent/Element.js"

export default class Slider extends Element{
    constructor(params ={}) {
        super(params)
        this.previousValue = (this.min+this.max)/2
    }
    Build() {
        this.zIndex = this.zIndex || 3
        this.element = document.createElement("input")
        this.element.oninput = this.onInput.bind(this)
        this.element.type = "range"
        this.element.min = this.min
        this.element.max = this.max
        this.element.step = this.step || 1
        this.element.value = this.previousValue
        
        
        super.Build()
    }
    onInput(event) {
        this.value = this.element.value
        if (this.func) {
            const args = this.funcArgs || []
            this.func.call(this, this.value, this.previousValue, event, ...args)
        }
        this.previousValue = this.value
    }
}