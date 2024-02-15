function SetupRenderPipeline(label, topology) {
    return CRAWLER_RENDERER.GPU.Device.createRenderPipeline({
        label: label, // for debugging
        layout: CRAWLER_RENDERER.GPU.LAYOUTS.PipelineLayout, 
        vertex: {
            module: CRAWLER_RENDERER.SHADERS.MainRenderShader,
            entryPoint: "vertexMain", // name of vertex shader function
            buffers: [CRAWLER_RENDERER.GPU.LAYOUTS.VertexBufferLayout, CRAWLER_RENDERER.GPU.LAYOUTS.ColourBufferLayout, CRAWLER_RENDERER.GPU.LAYOUTS.NormalBufferLayout]
        },
        fragment: {
            module: CRAWLER_RENDERER.SHADERS.MainRenderShader,
            entryPoint: "fragmentMain", // name of fragment shader function
            targets: [{
                format: CRAWLER_RENDERER.GPU.CanvasFormat // what to render to
            }]
        },
        primitive: {
            topology: topology, // i.e Triangle List
            indexFormat: "uint32" // needed uint32 for larger spheres
        },
        multisample: {
            count: CRAWLER_RENDERER.GPU.MSAACount // webGPU only supports val of 4 right now
        },
        depthStencil: {
            format: "depth24plus",
            depthWriteEnabled: true,
            depthCompare: "less" // keep fragments that are "less"
        }
    })
}

export default async function SetupPipelines() {
    const MainRenderTrianglePipeline = SetupRenderPipeline("Main Triangle List Render Pipeline", "triangle-list")
    const MainRenderLinePipeline = SetupRenderPipeline("Main Line List Render Pipeline", "line-list")

    return { 
        MainRenderTrianglePipeline, 
        MainRenderLinePipeline,
    }
}
