import { gl } from "../../Setups/setup.js"
import { Shape } from "../Shape.js"

export class Cube extends Shape {
        constructor(parameters={}) {
            const width = parameters.width||1
            const length = parameters.length||width
            const depth = parameters.depth||width
            // multiply rotations at once, scale
            super("cube", parameters.center||[0,0,0], [width, length, depth], parameters.rotation||{angle: 0, axis: [0, 1, 0]}, gl.TRIANGLES, parameters.material, parameters.lighting)
            
            this.width = width
            this.length = length
            this.depth = depth

            this.generate()
            this.createBuffers()
        }
        generate() {
            // front face
            this.positions.push(-0.5, 0.5, -0.5) // top left
            this.positions.push(-0.5, -0.5, -0.5) // bottom left
            this.positions.push(0.5, 0.5, -0.5) // top right
            this.positions.push(0.5, -0.5, -0.5) // bottom right
            // back face
            this.positions.push(-0.5, 0.5, 0.5) // top left
            this.positions.push(-0.5, -0.5, 0.5) // bottom left
            this.positions.push(0.5, 0.5, 0.5) // top right
            this.positions.push(0.5, -0.5, 0.5) // bottom right
            // right face
            this.positions.push(-0.5, 0.5, 0.5) // top left
            this.positions.push(-0.5, -0.5, 0.5) // bottom left
            this.positions.push(-0.5, 0.5, -0.5) // top right
            this.positions.push(-0.5, -0.5, -0.5) // bottom right
            // left face
            this.positions.push(0.5, 0.5, -0.5) // top left
            this.positions.push(0.5, -0.5, -0.5) // bottom left
            this.positions.push(0.5, 0.5, 0.5) // top right
            this.positions.push(0.5, -0.5, 0.5) // bottom right
            // top face
            this.positions.push(-0.5, 0.5, -0.5) // bottom left
            this.positions.push(0.5, 0.5, -0.5) // bottom right
            this.positions.push(-0.5, 0.5, 0.5) // top left
            this.positions.push(0.5, 0.5, 0.5) // top right
            // bottom face
            this.positions.push(-0.5, -0.5, 0.5) // top left
            this.positions.push(-0.5, -0.5, -0.5) // bottom left
            this.positions.push(0.5, -0.5, 0.5) // top right
            this.positions.push(0.5, -0.5, -0.5) // bottom right

            this.normals.push(
                // Front
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
            
                // Back
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0,
            
                // Right
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
            
                // Left
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,

                // Top
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                
                // Bottom
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0,
                0.0, -1.0, 0.0
  )
            
            // front face
            this.indices.push(0, 1, 2) // bottom left
            this.indices.push(1, 2, 3) // top right
            // back face
            this.indices.push(4, 5, 6) // bottom left
            this.indices.push(5, 6, 7) // top right
            // right face
            this.indices.push(8, 9, 10) // bottom left
            this.indices.push(9, 10, 11) // top right
            // left face
            this.indices.push(12, 13, 14) // bottom left
            this.indices.push(13, 14, 15) // top right
            // top face
            this.indices.push(16, 17, 18) // bottom left
            this.indices.push(17, 18, 19) // top right
            // bottom face
            this.indices.push(20, 21, 22) // bottom left
            this.indices.push(21, 22, 23) // top right

            // front face
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            // back face
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            // right face
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            // left face
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            // top face
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            // bottom face
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            this.colors.push(1, 1, 1)
            
        }
    }