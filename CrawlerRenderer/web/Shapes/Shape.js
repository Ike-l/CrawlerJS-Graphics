import RenderObject from "./RenderObject.js"

export default class Shape extends RenderObject {
    constructor(parameters = {}) {
        super(parameters)
        this.Translate(parameters.translation)
        if (parameters.rotation) {
            // handle arrays of rotations (for compounding axis)
            parameters.rotation.forEach(rot => {
                this.Rotate(...rot)
            })
        }
        this.Scale2 = [0, 0, 0]
        this.Stretch(parameters.stretch)
        this.test = performance.now()-10000 // for testing
        
    }
    get Scale2() {
        return this.scale2
    }
    set Scale2(scale2) {
        if (typeof scale2 == "object") {
            if (scale2.length == 3) {
                this.scale2 = scale2
            }
        }
    }
    get Quality() {
        return this.quality
    }
    set Quality(quality) {
        if (typeof quality == "number") {
            // Through trial and error
            // theoretical maximum apparently ~ 26754 (quality^{2} * 6 = 2^{32}-1 <- uint32array max value)
            this.quality = Math.min(Math.max(quality, 7), 3000)
        }
    }
    get Material() {
        return this.material
    }
    set Material(material) {
        if (typeof material == "object") {
            this.material = material
        } else {
            this.material = new CRAWLER_RENDERER.MATERIALS.Material() // default
        }
    }
    // a mapping between the material object and the shape
    get Ambience() {
        return this.Material.Ambience
    }
    get Diffusivity() {
        return this.Material.Diffusivity
    }
    get Specularity() {
        return this.Material.Specularity
    }
    get Shininess() {
        return this.Material.Shininess
    }
    // had no setters in a previous version lol :/
    set Ambience(ambience) {
        this.Material.Ambience = ambience
    }
    set Diffusivity(diffusivity) {
        this.Material.Diffusivity = diffusivity
    }
    set Specularity(specularity) {
        this.Material.Specularity = specularity
    }
    set Shininess(shininess) {
        this.Material.Shininess = shininess
    }
    
    get RotationMatrix() {
        return this.rotationMatrix
    }
    set RotationMatrix(rotation) {
        if (typeof rotation == "object") {
            this.rotationMatrix = rotation
        }
    }
    set Rotation([axis, angle]) {
        this.rotationMatrix = mat4.create()
        this.Rotate(axis, angle)
    }
    Rotate(axis, angle) {
        if (typeof axis == "object" && typeof angle == "number") {
            const rotationQuat = quat.create()
            const rotationMat = mat4.create()
            quat.setAxisAngle(rotationQuat, axis, angle)
            mat4.fromQuat(rotationMat, rotationQuat)
            mat4.multiply(this.RotationMatrix, this.RotationMatrix, rotationMat)
        }
    }
    get ScaleMatrix() {
        return this.scaleMatrix
    }
    set ScaleMatrix(scale) {
        if (typeof scale == "object") {
            this.scaleMatrix = scale
        }
    }
    set Scale(scale) {
        if (typeof scale == "object") {
            this.scaleMatrix = mat4.create()
            this.Scale2 = [0, 0, 0]
            this.Stretch(scale)
        }
    }
    Stretch(stretch) {
        if (typeof stretch == "object") {
            vec3.add(this.Scale2, this.Scale2, stretch)
            mat4.scale(this.scaleMatrix, this.scaleMatrix, stretch)
        }
    }

    get ModelMatrix() {
        const modelMatrix = mat4.create()
        mat4.multiply(modelMatrix, modelMatrix, this.TranslationMatrix)
        mat4.multiply(modelMatrix, modelMatrix, this.RotationMatrix)
        mat4.multiply(modelMatrix, modelMatrix, this.ScaleMatrix)
        return modelMatrix
    }
    get NormalMatrix() {
        const normalMatrix = mat4.create()
        // normals are unit length vectors, follows from dot products
        mat4.invert(normalMatrix, this.ModelMatrix)
        mat4.transpose(normalMatrix, normalMatrix)
        return normalMatrix
    }
    CreateBuffers() {
        const vertexPositionBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Vertex Position Buffer", this.VertexPositions.byteLength, "VERTEX")
        
        const vertexColourBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Vertex Colour Buffer", this.VertexColours.byteLength, "VERTEX")
        
        const vertexNormalBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Vertex Normals Buffer", this.VertexNormals.byteLength, "VERTEX")
        
        const vertexIndicesBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Vertex Indices Buffer", this.VertexIndices.byteLength, "INDEX")

        
        const modelMatrixBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Shape Model Matrix Buffer", this.ModelMatrix.byteLength, "UNIFORM")
        const normalMatrixBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Shape Normal Matrix Buffer", this.NormalMatrix.byteLength, "UNIFORM")

        
        const ambienceBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Shape Ambience Buffer", new Float32Array(this.Ambience).byteLength, "UNIFORM")
        
        const diffusivityBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Shape Diffusivity Buffer", new Float32Array(this.Diffusivity).byteLength, "UNIFORM")
        
        const specularityBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Shape Specularity Buffer", new Float32Array(this.Specularity).byteLength, "UNIFORM")
        //console.log("CREATE BUFFER:",  new Float32Array([this.Shininess]))
        //console.log("CREATE BUFFER 2 :",  new Float32Array([this.Shininess]).byteLength)
        const shininessBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Shape Shininess Buffer", new Float32Array([this.Shininess]).byteLength, "UNIFORM")

    
        return {
            vertexPositionBuffer,
            vertexColourBuffer,
            vertexNormalBuffer,
            vertexIndicesBuffer,
            
            modelMatrixBuffer,
            normalMatrixBuffer,
            
            ambienceBuffer,
            diffusivityBuffer,
            specularityBuffer,
            shininessBuffer
        }
    }
    CreateBindGroups() {

        const ObjectMatrixBindGroup = CRAWLER_RENDERER.GPU.CREATION.createBindGroup("Shape Matrix bind group", CRAWLER_RENDERER.GPU.LAYOUTS.ObjectMatrixBindGroupLayout, [this.Buffers.modelMatrixBuffer, this.Buffers.normalMatrixBuffer])
        
        const MaterialBindGroup = CRAWLER_RENDERER.GPU.CREATION.createBindGroup("Shape Material bind group", CRAWLER_RENDERER.GPU.LAYOUTS.MaterialBindGroupLayout, [this.Buffers.ambienceBuffer, this.Buffers.diffusivityBuffer, this.Buffers.specularityBuffer, this.Buffers.shininessBuffer])

        
        return [ObjectMatrixBindGroup, MaterialBindGroup]
    }
    UpdateStaticBuffers() {
        this.device.queue.writeBuffer(this.Buffers.vertexPositionBuffer, 0, this.VertexPositions)
        this.device.queue.writeBuffer(this.Buffers.vertexColourBuffer, 0, this.VertexColours)
        this.device.queue.writeBuffer(this.Buffers.vertexIndicesBuffer, 0, this.VertexIndices)
        this.device.queue.writeBuffer(this.Buffers.vertexNormalBuffer, 0, this.VertexNormals)
    }
    UpdateVariableBuffers() {
        this.device.queue.writeBuffer(this.Buffers.modelMatrixBuffer, 0, this.ModelMatrix)
        this.device.queue.writeBuffer(this.Buffers.normalMatrixBuffer, 0, this.NormalMatrix)

        this.device.queue.writeBuffer(this.Buffers.ambienceBuffer, 0, new Float32Array(this.Ambience))
        this.device.queue.writeBuffer(this.Buffers.diffusivityBuffer, 0, new Float32Array(this.Diffusivity))
        this.device.queue.writeBuffer(this.Buffers.specularityBuffer, 0, new Float32Array(this.Specularity))
        this.device.queue.writeBuffer(this.Buffers.shininessBuffer, 0, new Float32Array([this.Shininess]))
    }
    Draw(pass, perspectiveBindGroup, LightBindGroup) {
        this.UpdateVariableBuffers()
        // Attributes
        pass.setVertexBuffer(0, this.Buffers.vertexPositionBuffer)
        pass.setVertexBuffer(1, this.Buffers.vertexColourBuffer)
        pass.setVertexBuffer(2, this.Buffers.vertexNormalBuffer)
        pass.setIndexBuffer(this.Buffers.vertexIndicesBuffer, "uint32")
        // Uniforms
        pass.setBindGroup(0, this.BindGroups[0])
        pass.setBindGroup(1, this.BindGroups[1])
        pass.setBindGroup(2, perspectiveBindGroup)
        pass.setBindGroup(3, LightBindGroup)
        pass.drawIndexed(this.VertexIndices.length, 1, 0, 0, 0)
    }
}