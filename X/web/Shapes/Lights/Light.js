export default class Light {
    constructor(parameters = {}) {
        this.label = parameters.label || "Unlabelled Light"
        this.Position = parameters.position || [0, 0, 0]
        this.Colour = parameters.colour || [1, 1, 1]
        this.Intensity = parameters.intensity || 1
    }
    get Label() {
        return this.label 
    }
    set Label(label) {
        if (typeof label == "string") {
            this.label = label
        }
    }
    get Position() {
        return this.position
    }
    set Position(position) {
        if (typeof position == "object") {
            if (position.length == 3) {
                this.position = position
            }
        }
    }
    get Colour() {
        return this.colour
    }
    set Colour(colour) {
        if (typeof colour == "object") {
            if (colour.length == 3) {
                this.colour = colour
            }
        }
    }
    get Intensity() {
        return this.intensity
    }
    set Intensity(intensity) {
        if (typeof intensity == "number") {
            this.intensity = intensity
        }
    }
    Export() {
        const properties = this.LightProperties
        // removes the filler 0 placed in 
        properties.splice(3, 1)
        console.log(properties)
    }
    Translate(translation) {
        if (typeof translation == "object") {
            if (translation.length == 3) {
                this.Position = [
                    this.Position[0] + translation[0],
                    this.Position[1] + translation[1],
                    this.Position[2] + translation[2]
                ]
            }
        } 
    }
}