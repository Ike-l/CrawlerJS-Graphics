import Shape from "../Shape.js"

export default class Cube extends Shape {
    constructor(parameters = {}) {
        super(parameters) 
        this.Type2 = "Cube"
        // distance from center to corner using pythag
        this.DefaultRadius = (0.5**2 + 0.5**2) ** 0.5
    }
    get HitBoxCubeDimension() {
        // maximum scale, clamped at minimum of 1 * the distance from center to corner
        return Math.max(...this.Scale2, 1) * this.DefaultRadius
    }
    CreateVertexPositions() {
        const positions = []
        
        positions.push(-0.5, 0.5, -0.5) 
        positions.push(-0.5, -0.5, -0.5) 
        positions.push(0.5, 0.5, -0.5) 
        positions.push(0.5, -0.5, -0.5) 
        
        positions.push(-0.5, 0.5, 0.5)
        positions.push(-0.5, -0.5, 0.5) 
        positions.push(0.5, 0.5, 0.5) 
        positions.push(0.5, -0.5, 0.5) 
   
        positions.push(-0.5, 0.5, 0.5) 
        positions.push(-0.5, -0.5, 0.5) 
        positions.push(-0.5, 0.5, -0.5) 
        positions.push(-0.5, -0.5, -0.5) 
        
        positions.push(0.5, 0.5, -0.5) 
        positions.push(0.5, -0.5, -0.5) 
        positions.push(0.5, 0.5, 0.5) 
        positions.push(0.5, -0.5, 0.5) 
        
        positions.push(-0.5, 0.5, -0.5) 
        positions.push(0.5, 0.5, -0.5) 
        positions.push(-0.5, 0.5, 0.5) 
        positions.push(0.5, 0.5, 0.5) 
        
        positions.push(-0.5, -0.5, 0.5) 
        positions.push(-0.5, -0.5, -0.5) 
        positions.push(0.5, -0.5, 0.5) 
        positions.push(0.5, -0.5, -0.5) 
        
        return new Float32Array(positions)
    }
    CreateVertexColours() {
        const colours = []

        colours.push(1, 1, 1)
        colours.push(1, 1, 1)
        colours.push(1, 1, 1)
        colours.push(1, 1, 1)

        colours.push(0, 0, 0)
        colours.push(0, 0, 0)
        colours.push(0, 0, 0)
        colours.push(0, 0, 0)

        colours.push(1, 0, 0)
        colours.push(1, 0, 0)
        colours.push(1, 0, 0)
        colours.push(1, 0, 0)

        colours.push(0, 1, 0)
        colours.push(0, 1, 0)
        colours.push(0, 1, 0)
        colours.push(0, 1, 0)
   
        colours.push(0, 0, 1)
        colours.push(0, 0, 1)
        colours.push(0, 0, 1)
        colours.push(0, 0, 1)
  
        colours.push(0.5, 0.5, 0.5)
        colours.push(0.5, 0.5, 0.5)
        colours.push(0.5, 0.5, 0.5)
        colours.push(0.5, 0.5, 0.5)
        
        return new Float32Array(colours)
    }
    CreateVertexIndices() {
        const indices = []
        
        indices.push(0, 1, 2) 
        indices.push(1, 2, 3) 
        
        indices.push(4, 5, 6) 
        indices.push(5, 6, 7) 
        
        indices.push(8, 9, 10) 
        indices.push(9, 10, 11) 
        
        indices.push(12, 13, 14) 
        indices.push(13, 14, 15) 
        
        indices.push(16, 17, 18) 
        indices.push(17, 18, 19) 
        
        indices.push(20, 21, 22) 
        indices.push(21, 22, 23) 
        
        return new Uint32Array(indices)
    }
    CreateVertexNormals() {
        const normals = []

        normals.push(0, 0, -1)
        normals.push(0, 0, -1)
        normals.push(0, 0, -1)
        normals.push(0, 0, -1)

        normals.push(0, 0, 1)
        normals.push(0, 0, 1)
        normals.push(0, 0, 1)
        normals.push(0, 0, 1)

        normals.push(-1, 0, 0)
        normals.push(-1, 0, 0)
        normals.push(-1, 0, 0)
        normals.push(-1, 0, 0)

        normals.push(1, 0, 0)
        normals.push(1, 0, 0)
        normals.push(1, 0, 0)
        normals.push(1, 0, 0)
        
        normals.push(0, 1, 0)
        normals.push(0, 1, 0)
        normals.push(0, 1, 0)
        normals.push(0, 1, 0)

        normals.push(0, -1, 0)
        normals.push(0, -1, 0)
        normals.push(0, -1, 0)
        normals.push(0, -1, 0)
         
        return new Float32Array(normals)
    }
}