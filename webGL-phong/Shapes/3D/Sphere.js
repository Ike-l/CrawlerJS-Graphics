import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class Sphere extends Shape {
        constructor(parameters = {}) {
            const radius = parameters.radius || 1
            super("sphere", parameters.center||[0,0,0], [radius, radius, radius], parameters.rotation||{angle: 0, axis: [0, 1, 0]}, gl.TRIANGLES, parameters.material, parameters.lighting)
            this.radius = radius
            this.quality = parameters.quality || 40
            
            this.generate()
            this.createBuffers()
        }
        generate() {
            for (let latNumber = 0; latNumber <= this.quality; ++latNumber) {
                let theta = latNumber * Math.PI / this.quality
                // let theta = 2 * Math.PI * Math.phi * this.quality ?/?
                let sinTheta = Math.sin(theta)
                let cosTheta = Math.cos(theta)

                for (let longNumber = 0; longNumber <= this.quality; ++longNumber) {
                    let phi = longNumber * 2 * Math.PI / this.quality
                    // let phi = 2 * Math.PI * Math.phi * this.quality ?/?
                    let sinPhi = Math.sin(phi)
                    let cosPhi = Math.cos(phi)

                    let x = cosPhi * sinTheta
                    let y = cosTheta
                    let z = sinPhi * sinTheta

                    this.positions.push(0.5 * x)
                    this.positions.push(0.5 * y)
                    this.positions.push(0.5 * z)

                    this.normals.push(0.5 * x, 0.5 * y, 0.5 * z)

                    this.colors.push(1, 1, 1)

                    if (latNumber != this.quality && longNumber != this.quality) {
                        let first = (latNumber * (this.quality + 1)) + longNumber
                        let second = first + this.quality + 1
                        this.indices.push(first)
                        this.indices.push(second)
                        this.indices.push(first + 1)

                        this.indices.push(second)
                        this.indices.push(second + 1)
                        this.indices.push(first + 1)
                    }
                }
            }
        }
    }