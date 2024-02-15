import Shape from "../Shape.js"

export default class Sphere extends Shape {
    constructor(parameters = {}) {
        super(parameters)
        this.DefaultRadius = 0.5
    }
    get HitBoxCubeDimension() {
        // maximum scale, clamped at minimum of 1 * the distance from center to corner
        return Math.max(...this.Scale2) * this.DefaultRadius
    }
    CreateVertexInformation() {
        // explained elsewhere
        const positions = []
        const normals = []
        const colours = []
        const indices = []
        for (let latNumber = 0; latNumber <= this.Quality; ++latNumber) {
            const theta = latNumber * Math.PI / this.Quality
            const sinTheta = Math.sin(theta)
            const cosTheta = Math.cos(theta)
            
            for (let longNumber = 0; longNumber <= this.Quality; ++longNumber) {
                const phi = longNumber * 2 * Math.PI / this.Quality
                const sinPhi = Math.sin(phi)
                const cosPhi = Math.cos(phi)
                
                const x = cosPhi * sinTheta
                const y = cosTheta
                const z = sinPhi * sinTheta
                
                positions.push(0.5 * x)
                positions.push(0.5 * y)
                positions.push(0.5 * z)

                normals.push(0.5 * x, 0.5 * y, 0.5 * z)

                colours.push(1, 0.5, 0)

                if (latNumber != this.Quality && longNumber != this.Quality) {
                    let first = (latNumber * (this.Quality + 1)) + longNumber
                    let second = first + this.Quality + 1
                    indices.push(first)
                    indices.push(second)
                    indices.push(first + 1)

                    indices.push(second)
                    indices.push(second + 1)
                    indices.push(first + 1)
                }
            }
        }
        return {
            positions: new Float32Array(positions),
            normals: new Float32Array(normals),
            colours: new Float32Array(colours),
            indices: new Uint32Array(indices),
        }
    }
}