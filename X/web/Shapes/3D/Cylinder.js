import Shape from "../Shape.js"

export default class Cylinder extends Shape {
    constructor(parameters = {}) {
        super(parameters)
        this.DefaultRadius = (0.5**2 + 0.5**2) ** 0.5
    }
    get HitBoxCubeDimension() {
        // maximum scale, clamped at minimum of 1 * the distance from center to corner
        return Math.max(...this.Scale2) * this.DefaultRadius
    }
    CreateVertexInformation() {
        // explained elsewhere, generates sides then the top face & bottom face
        const positions = []
        const normals = []
        const colours = []
        const indices = []
        for (let point = 0; point <= this.Quality; point++) {
            const angle = point * 2*Math.PI/this.Quality
            const x = Math.cos(angle)
            const z = Math.sin(angle)
            positions.push(x * 0.5, -0.5, z * 0.5)
            positions.push(x * 0.5, 0.5, z * 0.5)
            colours.push(1, 1, 1)
            colours.push(1, 1, 1)

            normals.push(x * 0.5, 0, z * 0.5)
            normals.push(x * 0.5, 0, z * 0.5)
        }

        for (let indice = 0; indice < this.Quality; indice++) {
            indices.push(2 * indice)
            indices.push(2 * indice+1)
            indices.push(2 * indice+2)
            indices.push(2 * indice+1)
            indices.push(2 * indice+2)
            indices.push(2 * indice+3)
        }

        for (let face = 0; face < 2; face++) {
            const y = face==0 ? -0.5 : 0.5
            positions.push(0, y, 0)
            colours.push(1, 1, 1)
            normals.push(0, y, 0)
            const startIndex = positions.length / 3 - 1
            for (let point = 0; point <= this.Quality; point ++) {
                const angle = point * 2*Math.PI/this.Quality
                const x = Math.cos(angle)
                const z = Math.sin(angle)
                positions.push(x * 0.5, y, z * 0.5)
                colours.push(1, 1, 1)
                normals.push(0, y, 0)
            }
            const endIndex = positions.length / 3 - 1

            for (let indice = startIndex + 1; indice< endIndex; indice++) {
                indices.push(startIndex, indice, indice+1)
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