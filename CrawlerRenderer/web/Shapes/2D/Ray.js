import Shape from "../Shape.js"

export default class Ray extends Shape {
    constructor(parameters = {}) {
        super(parameters)
        this.DefaultDirection = parameters.defaultDirection
        this.Normalised = parameters.normalised
        this.Direction = parameters.direction
        this.Length = parameters.length
        this.AlignRay()
    }
    get DefaultDirection() {
        return this.defaultDirection
    }
    set DefaultDirection(direction) {
        if (direction) {
            this.defaultDirection = direction
        } else {
            // correponds to vertex positions
            this.defaultDirection = [0, 0, -1]
        }
        if ((this.Normalised === false || this.Normalised === true) && this.Direction && (this.Length===0 || this.Length) && this.DefaultDirection) {
            this.AlignRay()
        }
    }
    get Direction() {
        return this.direction
    }
    set Direction(direction) {
        if (direction) {
            if (this.Normalised) {
                const normalisedDirection = vec3.create()
                vec3.normalize(normalisedDirection, direction)
                this.direction = normalisedDirection
            } else {
                this.direction = direction
            }
        } else {
            // default direction
            this.direction = [0, 0, -1]
        }
        if ((this.Normalised === false || this.Normalised === true) && this.Direction && (this.Length===0 || this.Length) && this.DefaultDirection) {
            this.AlignRay()
        }
    }
    get Length() {
        return this.length
    }
    set Length(length) {
        if (length || length === 0) {
            this.length = length
        } else {
            this.length = vec3.length(this.Direction)
        }
        if ((this.Normalised === false || this.Normalised === true) && this.Direction && (this.Length===0 || this.Length) && this.DefaultDirection) {
            this.AlignRay()
        }
    }
    get Normalised() {
        return this.normalised
    }
    set Normalised(normalised) {
        // unit length
        this.normalised = normalised !== false
        if ((this.Normalised === false || this.Normalised === true) && this.Direction && (this.Length===0 || this.Length) && this.DefaultDirection) {
            this.AlignRay()
        }
    }

    AlignRay() {
        const normalisedDirection = vec3.create()
        vec3.normalize(normalisedDirection, this.Direction)
        const rayAxis = vec3.create()
        vec3.cross(rayAxis, this.DefaultDirection, normalisedDirection)
        const cosTheta = vec3.dot(this.DefaultDirection, normalisedDirection)
        const rayAngle = Math.acos(cosTheta)

        this.Rotation = [rayAxis, rayAngle]
        this.Scale = [1, 1, this.Length]
    }
    CreateVertexPositions() {
        const positions = []

        positions.push(0, 0, 0)
        positions.push(0, 0, -1)
        
        return new Float32Array(positions)
    }
    CreateVertexColours() {
        const colours = []
        
        colours.push(0, 0, 0)
        colours.push(0, 0, 0)
        
        return new Float32Array(colours)
    }
    CreateVertexIndices() {
        const indices = []

        indices.push(0, 1)
        
        return new Uint32Array(indices)
    }
    CreateVertexNormals() {
        const normals = []

        normals.push(0, 1, 0)
        normals.push(0, 1, 0)
        
        return new Float32Array(normals)
    }
}