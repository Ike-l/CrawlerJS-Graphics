import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class Cylinder extends Shape {
        constructor(parameters = {}) {
            const radius = parameters.radius || 0.5
            const height = parameters.height || 1
            super("cylinder", parameters.center||[0,0,0], [radius, height, radius], parameters.rotation||{angle: 0, axis: [0, 1, 0]}, gl.TRIANGLES, parameters.material, parameters.lighting)
            
            this.radius = radius
            this.height = height
            this.quality = parameters.quality || 40
            
            this.generate()
            this.createBuffers()
        }
        generate() {
            for (let point = 0; point <= this.quality; point++) {
                const angle = point * 2*Math.PI/this.quality
                const x = Math.cos(angle)
                const z = Math.sin(angle)
                this.positions.push(x, -0.5, z)
                this.positions.push(x, 0.5, z)
                this.colors.push(1, 1, 1)
                this.colors.push(1, 1, 1)

                this.normals.push(x, 0, z)
                this.normals.push(x, 0, z)
            }

            for (let indice = 0; indice < this.quality; indice++) {
                this.indices.push(2 * indice)
                this.indices.push(2 * indice+1)
                this.indices.push(2 * indice+2)
                this.indices.push(2 * indice+1)
                this.indices.push(2 * indice+2)
                this.indices.push(2 * indice+3)
            }

            for (let face = 0; face < 2; face++) {
                const y = face==0 ? -0.5 : 0.5
                this.positions.push(0, y, 0)
                this.colors.push(1, 1, 1)
                this.normals.push(0, y, 0)
                const startIndex = this.positions.length / 3 - 1
                for (let point = 0; point <= this.quality; point ++) {
                    const angle = point * 2*Math.PI/this.quality
                    const x = Math.cos(angle)
                    const z = Math.sin(angle)
                    this.positions.push(x, y, z)
                    this.colors.push(1, 1, 1)
                    this.normals.push(0, y, 0)
                }
                const endIndex = this.positions.length / 3 - 1

                for (let indice = startIndex + 1; indice< endIndex; indice++) {
                    this.indices.push(startIndex, indice, indice+1)
                }
            }
        }
    }