import Light from "../Light.js"

export default class DefaultPointLight extends Light{
    constructor(parameters = {}) {
        super(parameters)
        // intensity drop off
        this.Attenuation = parameters.attenuation || [1, 0.1, 0.01]
    }
    // used in attenuation index 0
    get Constant() {
        return this.constant
    }
    set Constant(constant) {
        if (typeof constant == "number") {
            this.constant = constant
        }
    }
    // used in attenuation index 1
    get Linear() {
        return this.linear
    }
    set Linear(linear) {
        if (typeof linear == "number") {
            this.linear = linear
        }
    }
    // used in attenuation index 2
    get Quadratic() {
        return this.quadratic
    }
    set Quadratic(quadratic) {
        if (typeof quadratic == "number") {
            this.quadratic = quadratic
        }
    }
    get Attenuation() {
        return [this.Constant, this.Linear, this.Quadratic]
    }
    set Attenuation(attenuation) {
        if (typeof attenuation == "object") {
            if (attenuation.length == 3) {
                this.Constant = attenuation[0]
                this.Linear = attenuation[1]
                this.Quadratic = attenuation[2]
            }
        }
    }
    get LightProperties() {
        // 0 makes position a vec4 cause webGPU needs it to be a vec4 ? pls some1 explain
        return [...this.Position, 0, ...this.Colour, this.Intensity, ...this.Attenuation]
    }
}