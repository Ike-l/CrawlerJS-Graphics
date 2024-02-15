import { gl } from "../Setups/setup.js"
import { program } from "../Setups/program.js"

export class Camera {
    constructor(parameters={}) {
        this.position = parameters.center || [0, 0, 0]
        this.lookingAt = parameters.lookingAt || [this.position[0], this.position[1], this.position[2]-1]
        this.upDirection = parameters.up || [0, 1, 0] 

        this.renderDistance = parameters.render || 1000
        
        this.yaw = parameters.yaw || 0
        this.pitch = parameters.pitch || 0
        this.roll = parameters.roll || 0
        
        this.viewMatrix = mat4.create()
        this.rotationMatrix = mat4.create()
        
        this.programInfo = {
            uniformLocations: {
                matViewUniformLocation: gl.getUniformLocation(program, "mView")
            }
        }

        
        this.lookAt(this.lookingAt)
        this.look()
    }
    
    calculateDirectionVector() {
        const x = Math.cos(this.yaw) * Math.cos(this.pitch)
        const y = Math.sin(this.pitch)
        const z = Math.sin(this.yaw) * Math.cos(this.pitch)
        return [x, y, z]
    }

    calculateRightVector() {
        let direction = this.calculateDirectionVector()
        let right = vec3.create()
        vec3.cross(right, direction, this.upDirection)
        vec3.normalize(right, right)
        return right
    }

    lookAt(position) {
        const direction = vec3.create()
        vec3.subtract(direction, position, this.position)
        this.yaw = Math.atan2(direction[2], direction[0])
        this.pitch = Math.atan2(direction[1], Math.sqrt(direction[0]*direction[0] + direction[2]*direction[2]))
    }

    look() {
        let direction = this.calculateDirectionVector()
        vec3.add(this.lookingAt, this.position, direction)
        mat4.lookAt(this.viewMatrix, this.position, this.lookingAt, this.upDirection)
    }
    
    reload() {
        this.look()
        gl.uniformMatrix4fv(this.programInfo.uniformLocations.matViewUniformLocation, gl.FALSE, this.viewMatrix)
    }
    
    addYaw(yaw) {
        this.yaw += yaw
    }
    //http://learnwebgl.brown37.net/07_cameras/camera_rotating_motion.html too old and badly written to tell what any of that means :P

    addPitch(pitch) {
        // to stop flipping i just prevent it from going past
        if (this.pitch + pitch > Math.PI/2 || this.pitch + pitch < -Math.PI/2) {
            return
        }
        this.pitch += pitch
    }

    addRoll(roll) {
        this.roll += roll
    }

    forward(amount) {
        let direction = this.calculateDirectionVector()
        vec3.scale(direction, direction, amount)
        vec3.add(this.position, this.position, direction)
    }

    left(amount) {
        let right = this.calculateRightVector()
        vec3.scale(right, right, amount)
        vec3.sub(this.position, this.position, right)
    }

    up(amount) {
        let movement = vec3.clone(this.upDirection)
        vec3.scale(movement, movement, amount)
        vec3.add(this.position, this.position, movement)
    }
    backward(amount) {
        let direction = this.calculateDirectionVector()
        vec3.scale(direction, direction, amount)
        vec3.sub(this.position, this.position, direction)
    }

    right(amount) {
        let right = this.calculateRightVector()
        vec3.scale(right, right, amount)
        vec3.add(this.position, this.position, right)
    }

    down(amount) {
        let movement = vec3.clone(this.upDirection)
        vec3.scale(movement, movement, amount)
        vec3.sub(this.position, this.position, movement)
    }
}