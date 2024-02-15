export default class Controller {
    constructor(parameters = {}) {
        this.Camera = parameters.camera
        this.Sensitivity = parameters.sensitivity
        // ensure scope
        this.resolveKeyPressFunction = this.KeyPress.bind(this)
        this.resolveMouseMoveFunction = this.MouseMove.bind(this)
        this.resolveClickFunction = this.Click.bind(this)
        this.resolveWheelFunction = this.Wheel.bind(this)
        this.resolveHoldFunction = this.Hold.bind(this)
        this.resolveResizeFunction = this.Resize.bind(this)
        document.addEventListener("keydown", this.resolveKeyPressFunction)
        document.addEventListener("mousemove", this.resolveMouseMoveFunction)
        document.addEventListener("click", this.resolveClickFunction)
        document.addEventListener("wheel", this.resolveWheelFunction)
        document.addEventListener("mousedown", this.resolveHoldFunction)
        window.addEventListener("resize", this.resolveResizeFunction)
    }
    get Camera() {
        return this.camera
    }
    set Camera(camera) {
        this.camera = camera
    }
    get Sensitivity() {
        return this.sensitivity
    }
    set Sensitivity(val) {
        if (val) {
            this.sensitivity = val
        } else {
            // px * sensitivity = movement in radians 
            this.sensitivity = 1e-3
        }
    }
    get Focused() {
        return this.Camera.Canvas.Element === document.pointerLockElement
    }
    get BuildMode() {
        return this.buildMode
    }
    set BuildMode(val) {
        this.buildMode = val
    }
    get RenderDistance() {
        return this.renderDistance
    }
    set RenderDistance(renderDistance) {
        this.renderDistance = renderDistance
    }

    EnableKeyW(evt) {
        if (this.Focused) {
            this.Camera.Forward(1)
        }
    }
    EnableKeyS(evt) {
        if (this.Focused) {
            this.Camera.Forward(-1)
        }
    }
    EnableKeyD(evt) {
        if (this.Focused) {
            this.Camera.Right(1)
        }
    }
    EnableKeyA(evt) {
        if (this.Focused) {
            this.Camera.Right(-1)
        }
    }
    EnableSpace(evt) {
        if (this.Focused) {
            this.Camera.Up(1)
        }
    }
    EnableShiftLeft(evt) {
        if (this.Focused) {
            this.Camera.Up(-1)
        }
    }
    // so events dont error, could use nullish (?) operator or an if but just easier this way
    EnableResize(evt) {
        
    }
    EnableClick(evt) {
        
    }
    EnableWheel(evt) {
        
    }
    EnableHold(evt) {
        
    }
    AfterKey(evt) {
        
    }
    Resize(evt) {
        this.EnableResize.call(this, evt)
    }
    Click(evt) {
        if (this.Focused) {
            this.EnableClick.call(this, evt)
        }
    }
    Wheel(evt) {
        if (this.Focused) {
            this.EnableWheel.call(this, evt)
        }
    }
    Hold(evt) {
        if (this.Focused) {
            this.EnableHold.call(this, evt)
        }
    }
    KeyPress(evt) {
        // uses the event itself, this enables easy implementations of custom keybinds
        const func = eval(`this.Enable${evt.code}`)
        if (func) {
            func.call(this, evt)
        }
        this.AfterKey.call(this, evt)
    }
    EnableCameraMove(evt) {
        if (this.Focused) {
            this.Camera.AddPitch(evt.movementY * this.Sensitivity * -1)
            this.Camera.AddYaw(evt.movementX * this.Sensitivity)
        }
    }
    MouseMove(evt) {
        this.EnableCameraMove(evt)
    }
}