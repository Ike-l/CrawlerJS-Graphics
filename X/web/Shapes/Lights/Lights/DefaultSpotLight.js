import Light from "../Light.js"

export default class DefaultSpotLight extends Light {
    constructor(parameters = {}) {
        super(parameters)
        this.Direction = parameters.direction || [0, 1, 0]
        // the inside of the cone, past this, the light intensity decreases
        this.InnerCone = parameters.innerCone || 0.95
        // light does not go past this
        this.OuterCone = parameters.outerCone || 0.99
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
    get InnerCone() {
        return this.innerCone
    }
    set InnerCone(innerCone) {
        if (typeof innerCone == "number") {
            this.innerCone = innerCone
        }
    }
    get OuterCone() {
        return this.outerCone
    }
    set OuterCone(outerCone) {
        if (typeof outerCone == "number") {
            this.outerCone = outerCone
        }
    }
   
    get LightProperties() {
        // 0 makes position a vec4 cause webGPU needs it to be a vec4 ? pls some1 explain
        return [...this.Position, 0, ...this.Colour, this.Intensity, ...this.Direction, this.InnerCone, this.OuterCone]
    }
}