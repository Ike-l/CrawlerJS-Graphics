import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class Plane extends Shape {
        constructor(parameters={}) {
            const width = parameters.width||1
            const length = parameters.length||width
            super("plane", parameters.center||[0,0,0], [width, 1, length], parameters.rotation||{angle: 0, axis: [0, 1, 0]}, gl.TRIANGLES, parameters.material, parameters.lighting)
            
            this.width = width
            this.length = length

            this.generate()
            this.createBuffers()
        }
        generate() {

            this.positions.push(0.5, 0, 0.5)
            this.positions.push(0.5, 0, -0.5)
            this.positions.push(-0.5, 0, 0.5)
            this.positions.push(-0.5, 0, -0.5)

            this.normals.push(0, 1, 0)
            this.normals.push(0, 1, 0)
            this.normals.push(0, 1, 0)
            this.normals.push(0, 1, 0)

            this.indices.push(0, 1, 2)
            this.indices.push(1, 2, 3)

            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
        }
    }