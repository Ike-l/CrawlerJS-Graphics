export default class Element {
    constructor(params = {}) {
        for (const [att, val] of Object.entries(params)) {
            this[att] = val
        }
        // expect parent. Text. 
        this.parent = this.parent || { element: document.documentElement}

        this.Build()        
        if (this.autoSize){ 
            window.addEventListener("resize", this.Resize.bind(this))
        }
        if (this.pointerLock && !this.func) {
            this.element.onclick = this.defaultClick.bind(this)
        }
    }
    Build() {
        // .. carry on
        this.element.innerHTML = this.text || ""
        this.element.style.position = "absolute"
        this.element.style.left = this.x
        this.element.style.top = this.y
        this.element.style.zIndex = this.zIndex
        this.element.style.width = this.width
        this.element.style.height = this.height
        this.parent.element.appendChild(this.element)
    }
    defaultClick() {
        this.element.requestPointerLock()
    }
    Resize(evt) {
        this.width = this.widthScale * window.innerWidth
        this.height = this.heightScale * window.innerHeight
        // had set the width as the height
        this.element.style.width = this.width + "px"
        this.element.style.height = this.height + "px"
    }
}