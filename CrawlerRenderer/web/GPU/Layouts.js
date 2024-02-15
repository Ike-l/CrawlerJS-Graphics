export default async function SetupLayouts() {
    // This contains layouts for creating the pipeline and compile the shaders. 
    
    const VertexBufferLayout = {
        arrayStride: 12, // float of 32 bits x3 for x y z
        attributes: [{
            format: "float32x3",
            offset: 0, // start at index 0
            shaderLocation: 0, // what location to use in shader
        }]
    }
    const ColourBufferLayout = {
        arrayStride: 12, // float of 32 bits x3 for x y z
        attributes: [{
            format: "float32x3",
            offset: 0, // start at index 0
            shaderLocation: 1, // what location to use in shader
        }]
    }
    const NormalBufferLayout = {
        arrayStride: 12, // float of 32 bits x3 for x y z
        attributes: [{
            format: "float32x3",
            offset: 0, // start at index 0
            shaderLocation: 2, // what location to use in shader
        }]
    }

    const ObjectMatrixBindGroupLayout = CRAWLER_RENDERER.GPU.Device.createBindGroupLayout({
        entries: [{
            binding: 0, // what binding to use in shader
            visibility: GPUShaderStage.VERTEX, // what shader can see this variable
            buffer: {}
        }, {
            binding: 1, // what binding to use in shader
            visibility: GPUShaderStage.VERTEX, // what shader can see this variable
            buffer: {}
        }]
    })
    const MaterialBindGroupLayout = CRAWLER_RENDERER.GPU.Device.createBindGroupLayout({
        entries: [{
            binding: 0, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }, {
            binding: 1, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }, {
            binding: 2, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }, {
            binding: 3, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }]
    })
    const CameraBindGroupLayout = CRAWLER_RENDERER.GPU.Device.createBindGroupLayout({
        entries: [{
            binding: 0, // what binding to use in shader
            visibility: GPUShaderStage.VERTEX, // what shader can see this variable
            buffer: {}
        }, {
            binding: 1, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }]
    })
    const LightBindGroupLayout = CRAWLER_RENDERER.GPU.Device.createBindGroupLayout({
        entries: [{
            binding: 0, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }, {
            binding: 1, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }, {
            binding: 2, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }, {
            binding: 3, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }, {
            binding: 4, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }, {
            binding: 5, // what binding to use in shader
            visibility: GPUShaderStage.FRAGMENT, // what shader can see this variable
            buffer: {}
        }]
    })
    
    const PipelineLayout = CRAWLER_RENDERER.GPU.Device.createPipelineLayout({
        bindGroupLayouts: [ObjectMatrixBindGroupLayout, MaterialBindGroupLayout, CameraBindGroupLayout, LightBindGroupLayout]
    })
    
    return {
        VertexBufferLayout,
        ColourBufferLayout,
        NormalBufferLayout,
        
        ObjectMatrixBindGroupLayout,
        
        CameraBindGroupLayout,
        
        MaterialBindGroupLayout,
        LightBindGroupLayout,


        PipelineLayout,
    }
}
