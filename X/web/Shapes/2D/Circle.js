import Shape from "../Shape.js"

export default class Circle extends Shape {
    constructor(parameters = {}) {
        super(parameters)
    }
    
    CreateVertexInformation() {
        const positions = []
        const normals = []
        const colours = []
        const indices = []
        
        positions.push(0, 0, 0)
        colours.push(1, 1, 1)
        normals.push(0, 1, 0)
        for (let point = 0; point <=this.Quality; point++) {
            // a point rotated around angle with x, z
            const angle = point * 2 * Math.PI/this.Quality
            const x = Math.cos(angle)
            const z = Math.sin(angle)
            
            positions.push(x * 0.5, 0, z * 0.5)
            // white 
            colours.push(1, 1, 1)
            // facing up
            normals.push(0, 1, 0)
        }
        for (let indice = 0; indice <= this.quality; ++indice) {
            indices.push(0, indice, indice+1)
        }
        indices.push(0, this.Quality, 1)

        return {
            positions: new Float32Array(positions),
            normals: new Float32Array(normals),
            colours: new Float32Array(colours),
            indices: new Uint32Array(indices),
        }
    }
}