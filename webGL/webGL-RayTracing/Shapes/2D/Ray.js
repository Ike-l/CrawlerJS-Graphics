import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class Ray extends Shape {
        constructor(parameters={}) {
            super(parameters.center||[0,0,0], [1, 1, 1], {angle: 0, axis: [0, 1, 0]}, gl.LINES, parameters.material)
            
            if (typeof parameters.normalised == "undefined") {
                this.normalised = true
            } else {
                this.normalised = parameters.normalised
            }
            this.color = parameters.color || [1, 1, 0]
            this.direction = parameters.direction || [0, 1, 0]
            
            if (this.normalised) {
                vec3.normalize(this.direction, this.direction)
            }
            
            this.generate()
            this.createBuffers()
        }
        generate() {
            this.positions.push(0, 0, 0)
            // unoptimized but quick
            this.positions.push(...this.direction)

            this.indices.push(0, 1)

            this.colors.push(...this.color)
            this.colors.push(...this.color)
        }
    }