import Shape from "../Shape.js"

export default class A2BLine extends Shape {
    constructor(parameters = {}) {
        super(parameters)
        
        this.PointA = parameters.pointA
        this.PointB = parameters.pointB
    }
    get PointA() {
        return this.pointA
    }
    set PointA(pointA) {
        if (pointA) {
            this.pointA = pointA
        }
        if (this.PointB && this.PointA) {
            this.AlignLine()
        }
    }
    get PointB() {
        return this.pointB
    }
    set PointB(pointB) {
        if (pointB) {
            this.pointB = pointB
        }
        if (this.PointA && this.PointB) {
            this.AlignLine()
        }
    }

    AlignLine() {
        const direction = vec3.create()
        vec3.subtract(direction, this.pointB, this.pointA)
        const length = vec3.length(direction)

        vec3.normalize(direction, direction)

        const lineAxis = vec3.create()
        vec3.cross(lineAxis, [1, 0, 0], direction)
        vec3.normalize(lineAxis, lineAxis)

        const cosTheta = vec3.dot([1, 0, 0], direction)
        const lineAngle = Math.acos(cosTheta)

        const midPoint = vec3.create()
        vec3.add(midPoint, this.pointA, this.pointB)
        vec3.scale(midPoint, midPoint, 0.5)

        mat4.fromTranslation(this.TranslationMatrix, midPoint)

        mat4.fromRotation(this.RotationMatrix, lineAngle, lineAxis)
        // scale there purely because thats where it is in the vertex positions
        mat4.fromScaling(this.ScaleMatrix, [length, 1, 1])
    }
    CreateVertexPositions() {
        const positions = []

        positions.push(0.5, 0, 0)
        positions.push(-0.5, 0, 0)
        
        return new Float32Array(positions)
    }
    CreateVertexColours() {
        const colours = []

        colours.push(0, 0, 0)
        colours.push(0, 0, 0)
        
        return new Float32Array(colours)
    }
    CreateVertexIndices() {
        const indices = []

        indices.push(0, 1)
        
        return new Uint32Array(indices)
    }
    CreateVertexNormals() {
        const normals = []

        normals.push(0, 1, 0)
        normals.push(0, 1, 0)

        return new Float32Array(normals)
    }
    
}