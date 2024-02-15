import Shape from "../Shape.js"

export default class Plane extends Shape {
    constructor(parameters = {}) {
       super(parameters)
    }
    CreateVertexPositions() {
        const positions = []
        
        positions.push(0.5, 0, 0.5)
        positions.push(0.5, 0, -0.5)
        positions.push(-0.5, 0, 0.5)
        positions.push(-0.5, 0, -0.5)
        
        return new Float32Array(positions)
    }
    CreateVertexColours() {
        const colours = []
        
        colours.push(0.6, 0.6, 0.6)
        colours.push(0.6, 0.6, 0.6)
        colours.push(0.6, 0.6, 0.6)
        colours.push(0.6, 0.6, 0.6)
        
        return new Float32Array(colours)
    }
    CreateVertexIndices() {
        const indices = []
        
        indices.push(0, 1, 2)
        indices.push(1, 2, 3)
        
        return new Uint32Array(indices)
    }
    CreateVertexNormals() {
        const normals = []

        normals.push(0, 1, 0)
        normals.push(0, 1, 0)
        normals.push(0, 1, 0)
        normals.push(0, 1, 0)

        return new Float32Array(normals)
    }
}