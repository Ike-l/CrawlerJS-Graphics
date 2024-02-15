import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class Ray extends Shape {
        constructor(parameters={}) {
            const defaultDirection = [0, 0, -1]
            
            const center = parameters.center || [0, 0, 0]
            const direction = parameters.direction || defaultDirection
            const normalised = parameters.normalised !== false
            const length = normalised ? 1 : vec3.length(direction)
            
            const normalisedDefaultDirection = vec3.create()
            vec3.normalize(normalisedDefaultDirection, defaultDirection)
            
            const normalisedDirection = vec3.create()
            vec3.normalize(normalisedDirection, direction)
            
            const rayAxis = vec3.create()
            vec3.cross(rayAxis, [0, 0, -1], direction)
            vec3.normalize(rayAxis, rayAxis)
            
            const cosTheta = vec3.dot(normalisedDefaultDirection, normalisedDirection)
            const rayAngle = Math.acos(cosTheta)

            super("ray", center, [1, 1, length], {angle: rayAngle, axis: rayAxis}, gl.LINES, parameters.material, parameters.lighting)

            this.direction = direction
            this.length = length
            this.normalised = normalised
            
            this.generate()
            this.createBuffers()
        }
        generate() {
            this.positions.push(0, 0, 0)
            this.positions.push(0, 0, -1)

            this.indices.push(0, 1)

            this.colors.push(0, 0, 0)
            this.colors.push(0, 0, 0)
        }
    }