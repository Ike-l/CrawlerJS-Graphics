export default class SVGGroup {
    constructor(params={}) {
        this.NameSpace = "http://www.w3.org/2000/svg"
        this.parent = params.parent || { element: document.documentElement }
        this.type = 'g'
        this.children = []
        
        this.width = params.width || 0
        this.height = params.height || 0
        this.widthScale = params.widthScale 
        this.heightScale = params.heightScale
        this.autoSize = params.autoSize
        this.Build()
        if (this.autoSize) {
            window.addEventListener("resize", this.Resize.bind(this)) 
            this.Resize()
        }

    }
    Build() {
        this.element = document.createElementNS(this.NameSpace, this.type)

        this.element.setAttribute("width", this.width)
        this.element.setAttribute("height", this.height)
        this.element.setAttribute("pointer-events", "auto")
        
        this.parent.element.appendChild(this.element)
    }
    Add() { // arguments is a dicitonary
        for (const object of arguments) {
            object.setParent(this)
            this.children.push(object)
        }
    }    
    Remove() {
        for (const object of arguments) {
            object.removeParent(this)
            this.children.pop(children.indexOf(object))
        }
    }
    setParent(parent) {
        this.parent = parent
        this.parent.element.appendChild(this.element)
    }
    removeParent(parent) {
        this.parent.element.removeChild(this.element)
        this.parent = undefined 
    }
    Resize(evt) {
        if (!(this.heightScale || this.widthScale)) return

        this.width = this.widthScale * window.innerWidth
        this.height = this.heightScale * window.innerHeight

        
        this.element.setAttribute("width", this.width)
        this.element.setAttribute("height", this.height)
    }
}