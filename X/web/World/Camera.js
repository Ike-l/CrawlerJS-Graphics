export default class Camera {
    constructor(parameters = {}) {
        this.Canvas = CRAWLER_RENDERER.GPU.Canvas
        if (typeof parameters.aspectRatio != "undefined") {
            this.AspectRatio = parameters.aspectRatio
        } else {
            this.AspectRatio = this.Canvas.AbsoluteWidth / this.Canvas.AbsoluteHeight
        }

        this.Range = parameters.range
        
        this.FOV = parameters.fov
        this.Near = parameters.near
        this.Far = parameters.far

        this.UpVector = parameters.up
        this.Position = parameters.position
        this.Yaw = parameters.yaw
        this.Pitch = parameters.pitch
        this.LookingAt = parameters.lookingAt
        this.LookAt(this.LookingAt)

        this.device = CRAWLER_RENDERER.GPU.Device
        
        this.Buffers = this.CreateBuffers()
        this.BindGroup = this.CreateBindGroup()
        this.UpdateVariableBuffers()
    }
    PositionInFront(multiplier) {
        return [
            this.LookingAt[0]+this.ForwardVector[0]*multiplier,
            this.LookingAt[1]+this.ForwardVector[1]*multiplier, 
            this.LookingAt[2]+this.ForwardVector[2]*multiplier
        ]
    }
    get Range() {
        return this.range
    }
    set Range(range) {
        if (typeof range != "undefined") {
            this.range = range
        } else {
            this.range = 10
        }
    }
    // Camera Start
    get Position() {
        return this.position
    }
    set Position(position) {
        if (position) {
            this.position = position
        } else {
            this.position = [0, 0, 0]
        }
    }
    // left right
    get Yaw() {
        return this.yaw
    }
    set Yaw(yaw) {
        if (yaw) {
            this.yaw = yaw
        } else {
            this.yaw = 0
        }
    }
    // up down
    get Pitch() {
        return this.pitch
    }
    set Pitch(pitch) {
        if (pitch) {
            const offset = 1e-10
            // When at +-pi/2 it cause screen to go black so just got small offset
            this.pitch = Math.max(-Math.PI/2+offset, Math.min(Math.PI/2-offset, pitch))
        } else {
            this.pitch = 0
        }
    }
    get UpVector() {
        return this.upVector
    }
    set UpVector(up) {
        if (up) {
            this.upVector = up
        } else {
            this.upVector = [0, 1, 0]
        }
    }
    get ForwardVector() {
        // simple 2D matrix multiplication of rotations
        const x = Math.cos(this.Yaw) * Math.cos(this.Pitch)
        const y = Math.sin(this.pitch)
        const z = Math.sin(this.Yaw) * Math.cos(this.Pitch)
        return [x, y, z]
    }
    get RightVector() {
        const right = vec3.create()
        vec3.cross(right, this.ForwardVector, this.UpVector)
        vec3.normalize(right, right)
        return right
    }
    get LookingAt() {
        return this.lookingAt
    }
    set LookingAt(posVec) {
        if (posVec) {
            this.lookingAt = posVec
        } else {
            this.lookingAt = [0, 0, 0]
        }
    }
    get ViewMatrix() {
        const viewMatrix = mat4.create()
        vec3.add(this.LookingAt, this.Position, this.ForwardVector)
        mat4.lookAt(viewMatrix, this.Position, this.LookingAt, this.UpVector)
        return viewMatrix
    }
    
    LookAt(position) {
        const direction = vec3.create()
        vec3.subtract(direction, position, this.Position)
        this.Yaw = Math.atan2(direction[2], direction[0])
        this.Pitch = Math.atan2(direction[1], Math.sqrt(direction[0]**2 + direction[2]**2))
    }
    AddYaw(yaw) {
        this.Yaw += yaw
    }
    AddPitch(pitch) {
        this.Pitch += pitch
    }
    Move(vector, amount) {
        vec3.scale(vector, vector, amount)
        vec3.add(this.Position, this.Position, vector)
    }
    Forward(amount) {
        this.Move(this.ForwardVector, amount)
    } 
    Up(amount) {
        this.Move(vec3.clone(this.UpVector), amount)
    }
    Right(amount) {
        this.Move(this.RightVector, amount)
    }
    /*toWorldSpace() {
        const width = this.Canvas.AbsoluteWidth
        const height = this.Canvas.AbsoluteHeight
        const mat = this.ProjectionViewMatrix

        const yaw = this.Yaw
        const pitch = this.Pitch
        const cameraPosition = this.Position
        const screenX = 200
        const screenY = 200
        
        const viewport = {
          x: 0,
          y: 0,
          width: width,
          height: height
        }
        
        const normalizedX = ((screenX - viewport.x) / viewport.width) * 2 - 1
        const normalizedY = 1 - ((screenY - viewport.y) / viewport.height) * 2
        
        const clipSpacePoint = vec4.fromValues(normalizedX, normalizedY, -1, 1)
        let inverseViewProjectionMatrix = mat4.create()
        mat4.invert(inverseViewProjectionMatrix, mat)
        let worldCoords = vec4.create()
        vec4.transformMat4(worldCoords, clipSpacePoint, inverseViewProjectionMatrix)

        worldCoords[0] /= worldCoords[3]
        worldCoords[1] /= worldCoords[3]
        worldCoords[2] /= worldCoords[3]
        
        return worldCoords
    }*/
    //Camera End
    // Perspective Start
    get FOV() {
        return this.fov
    }
    set FOV(fov) {
        if (fov) {
            this.fov = fov
        } else {
            this.fov = Math.PI/4
        }
    }
    get Canvas() {
        return this.canvas
    }
    set Canvas(canvas) {
        this.canvas = canvas
    }
    get AspectRatio() {
        return this.aspectRatio
        //return this.Canvas.AbsoluteWidth / this.Canvas.AbsoluteHeight
    }
    set AspectRatio(aspectRatio) {
        if (aspectRatio) {
            this.aspectRatio = aspectRatio
        } else {
            this.aspectRatio = this.Canvas.AbsoluteWidth / this.Canvas.AbsoluteHeight
        }
    }
    get Near() {
        return this.near
    }
    set Near(near) {
        if (near) {
            this.near = near
        } else {
            this.near = 0.1
        }
    }
    get Far() {
        return this.far
    }
    set Far(far) {
        if (far) {
            this.far = far
        } else {
            this.far = 10000
        }
    }
    get ProjectionMatrix() {
        const projectionMatrix = mat4.create()
        mat4.perspective(projectionMatrix, this.FOV, this.AspectRatio, this.Near, this.Far)
        return projectionMatrix
    }
    // Perspective End
    get ProjectionViewMatrix() {
        const projectionViewMatrix = mat4.create()
        mat4.multiply(projectionViewMatrix, this.ProjectionMatrix, this.ViewMatrix)
        return projectionViewMatrix
    }
    UpdateAspectRatio() {
        // sets ap to canvas w/h in setter
        this.AspectRatio = undefined
    }
    CreateBuffers() {
        
        const ProjectionViewMatrixBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Camera ProjectionViewMatrix Buffer", this.ProjectionViewMatrix.byteLength, "UNIFORM")
        const PositionBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Camera Position Buffer", new Float32Array(this.Position).byteLength, "UNIFORM")

        return {
            ProjectionViewMatrixBuffer, 
            PositionBuffer
        }
    }
    CreateBindGroup() {
        const bindGroup = CRAWLER_RENDERER.GPU.CREATION.createBindGroup("Camera bind group", CRAWLER_RENDERER.GPU.LAYOUTS.CameraBindGroupLayout, [this.Buffers.ProjectionViewMatrixBuffer, this.Buffers.PositionBuffer])
        
        return bindGroup
    }
    UpdateStaticBuffers() {
        console.warn("Camera has no static buffers")
    }
    UpdateVariableBuffers() {
        this.device.queue.writeBuffer(this.Buffers.ProjectionViewMatrixBuffer, 0, this.ProjectionViewMatrix)
        this.device.queue.writeBuffer(this.Buffers.PositionBuffer, 0, new Float32Array(this.Position))
    }
}