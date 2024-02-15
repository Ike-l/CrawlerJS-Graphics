import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class AtoBLine extends Shape {
    constructor(parameters={}) {
        const pointA = parameters.pointA || [0.5, 0, 0]
        const pointB = parameters.pointB || [-0.5, 0, 0]

        const direction = vec3.create()
        vec3.subtract(direction, pointB, pointA)

        const length = vec3.length(direction)

        vec3.normalize(direction, direction)

        const lineAxis = vec3.create()
        vec3.cross(lineAxis, [1, 0, 0], direction)
        vec3.normalize(lineAxis, lineAxis)

        const cosTheta = vec3.dot([1, 0, 0], direction)
        const lineAngle = Math.acos(cosTheta)

        const midpoint = vec3.create()
        vec3.add(midpoint, pointA, pointB)
        vec3.scale(midpoint, midpoint, 0.5)
        
        super("AtoBLine", midpoint, [length, 1, 1], {angle: lineAngle, axis: lineAxis}, gl.LINES, parameters.material, parameters.lighting)

        this.pointA = pointA
        this.pointB = pointB
        this.length = length
            
        this.generate()
        this.createBuffers()
    }
    generate() {
        this.positions.push(0.5, 0, 0)
        this.positions.push(-0.5, 0, 0)

        this.normals.push(0, 1, 0)
        this.normals.push(0, 1, 0)

        this.indices.push(0, 1)

        this.colors.push(0, 0, 0)
        this.colors.push(0, 0, 0)
    }
}