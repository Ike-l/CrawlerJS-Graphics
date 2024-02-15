export default class Material {
    constructor(parameters = {}) {
        // colour for when no light
        this.Ambience = parameters.ambience || [0, 0, 0]
        // colour for when light shine on it
        this.Diffusivity = parameters.diffusivity || [0.1, 0.1, 0.1]
        // colour for specular highlight
        this.Specularity = parameters.specularity || [0.5, 0.5, 0.5]
        // "shininess"
        this.Shininess = parameters.shininess || 1
    }
    get Ambience() {
        return this.ambience
    }
    set Ambience(ambience) {
        if (typeof ambience == "object") {
            if (ambience.length == 3) {
                this.ambience = ambience
            }
        }
    }
    get Diffusivity() {
        return this.diffusivity
    }
    set Diffusivity(diffusivity) {
        if (typeof diffusivity == "object") {
            if (diffusivity.length == 3) {
                this.diffusivity = diffusivity
            }
        }
    }
    get Specularity() {
        return this.specularity
    }
    set Specularity(specularity) {
        if (typeof specularity == "object") {
            if (specularity.length == 3) {
                this.specularity = specularity
            }
        }
    }
    get Shininess() {
        return this.shininess
    }
    set Shininess(shininess) {
        if (typeof shininess == "number") {
            this.shininess = shininess
        }
    }
}