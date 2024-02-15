export default class SVGElement {
    constructor(params={}) {
        this.NameSpace = "http://www.w3.org/2000/svg"
        this.parent = params.parent || { element: document.documentElement }
        this.type = 'svg'
        this.children = []
        
        this.width = params.width || 0
        this.height = params.height || 0
        this.widthScale = params.widthScale 
        this.heightScale = params.heightScale
        this.autoSize = params.autoSize
        this.Build()
        if (this.autoSize) window.addEventListener("resize", this.Resize.bind(this)) 

    }
    Build() {
        this.element = document.createElementNS(this.NameSpace, this.type)

        this.element.setAttribute("width", this.width)
        this.element.setAttribute("height", this.height)
        this.element.style.position = "absolute"
        this.element.style.zIndex = this.zIndex || 2
        this.element.setAttribute("fill", "red")
        this.element.setAttribute("pointer-events", "none")
        this.parent.element.appendChild(this.element)
    }
    Add() { // arguments is a dicitonary
        for (const object of arguments) {
            object.setParent(this)
            this.children.push(object)
        }
    }    
    remove(index) {
        const object = this.children[index]
        object.remove()
        this.children.splice(index, 1)
    }
    Remove() {
        for (const object of arguments) {
            object.remove()
            this.children.pop(this.children.indexOf(object))
        }
    }
    
    Resize(evt) {
        if (!(this.heightScale || this.widthScale)) return

        this.width = this.widthScale * window.innerWidth
        this.height = this.heightScale * window.innerHeight

        
        this.element.setAttribute("width", this.width)
        this.element.setAttribute("height", this.height)
    }
}