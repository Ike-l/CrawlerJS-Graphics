import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class Line extends Shape {
        constructor(parameters={}) {
            const length = parameters.length||1
            super(parameters.center||[0,0,0], [length, 1, 1], parameters.rotation||{angle: 0, axis: [0, 1, 0]}, gl.LINES, parameters.material)
            
            this.length = length

            this.color = parameters.color || [0, 1, 0]
            this.generate()
            this.createBuffers()
        }
        generate() {
            this.positions.push(0.5, 0, 0)
            this.positions.push(-0.5, 0, 0)

            this.normals.push(0, 1, 0)
            this.normals.push(0, 1, 0)

            this.indices.push(0, 1)

            this.colors.push(...this.color)
            this.colors.push(...this.color)
        }
    }