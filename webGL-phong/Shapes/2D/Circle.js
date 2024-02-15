import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class Circle extends Shape {
        constructor(parameters={}) {
            const radius = parameters.radius || 0.5
            super("circle", parameters.center||[0,0,0], [radius, 1, radius], parameters.rotation||{angle: 0, axis: [0, 1, 0]}, gl.TRIANGLES, parameters.material, parameters.lighting)

            this.radius = radius
            this.quality = parameters.quality || 40
            this.generate()
            this.createBuffers()
        }
        generate() {
            this.positions.push(0, 0, 0)
            this.colors.push(1, 1, 1)
            this.normals.push(0, 1, 0)
            for (let point = 0; point <=this.quality; point++) {
                const angle = point * 2*Math.PI/this.quality
                const x = Math.cos(angle)
                const z = Math.sin(angle)
                this.positions.push(x, 0, z)
                this.colors.push(1, 1, 1)
                this.normals.push(0, 1, 0)
            }
            for (let indice = 0; indice <= this.quality; ++indice) {
                this.indices.push(0, indice, indice+1)
            }
            this.indices.push(0, this.quality, 1)
        }
    }