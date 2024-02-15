import Light from "../Light.js"

export default class DefaultDirectionalLight extends Light {
    constructor(parameters = {}) {
        super(parameters)
        this.Direction = parameters.direction || [0, 1, 0]
    }
    get Direction() {
        return this.direction
    }
    set Direction(direction) {
        if (typeof direction == "object") {
            if (direction.length == 3) {
                this.direction = direction
            }
        }
    }
    get LightProperties() {
        // 0 makes position a vec4 cause webGPU needs it to be a vec4 ? pls some1 explain
        return [...this.Position, 0, ...this.Colour, this.Intensity, ...this.Direction]
    }
}