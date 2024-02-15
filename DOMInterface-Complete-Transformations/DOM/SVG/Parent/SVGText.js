export default class SVGText {
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
        this.type = params.type || 'text'
        this.lines = []
        this.text = params.text || ""
        this.parentElement = params.parentElement

        this.fillColor = params.color || "#000000"
        this.strokeWidth = params.width || "1px"
        this.fontSize = params.fontSize || "20px"

        this.X = params.x || 0
        this.Y = params.y || 0
        this.maxWidth = params.width || 0
        this.maxHeight = params.height || 0
        
        this.Build()
    }
    Build() {
        this.element = document.createElementNS(this.NameSpace, this.type)

        this.element.setAttribute("x", this.X)
        this.element.setAttribute("y", this.Y)

        this.element.setAttribute("font-size", this.fontSize)
        
        this.element.setAttribute("fill", this.fillColor)
        this.element.setAttribute("stroke-width", this.strokeWidth)
        
        this.element.textContent = this.text
        
        this.parentElement.element.appendChild(this.element)
    }
    WriteLine(text) {
        this.text = text
        this.element.textContent = this.text
    }
    EditText(text) {
        this.text += text
        this.element.textContent += text
    }
    Add() {
        for (const object of arguments) {
            object.setParent(this)
            this.children.push(object)
        }
    }    
    removeParent() {
        this.parentElement.element.removeChild(this.element)
        this.parent = undefined
    }
    remove() {
        this.removeParent()
    }
    setParent(parent) {
        this.parent = parent
        this.parentElement.element.appendChild(this.element)
    }
    setPosition(x, y) {
        this.X = x
        this.Y = y
        this.element.setAttribute("x", this.X)
        this.element.setAttribute("y", this.Y+parseInt(this.fontSize.split("px")[0]))
    }
}