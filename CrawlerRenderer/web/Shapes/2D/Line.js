import Shape from "../Shape.js"

export default class Line extends Shape {
    constructor(parameters = {}) {
        super(parameters)
    }
    CreateVertexPositions() {
        const positions = []

        positions.push(0.5, 0, 0)
        positions.push(-0.5, 0, 0)
        
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