// i: the current iteration
// iterations: the total number of iterations
// iterationsPerSecond: => fps
// before: function before all draw
// after: function after all draw
// objectFunction: function per object
export default function Draw(i, iterations, iterationsPerSecond, before, after, objectFunction) {
    if (typeof camera == "undefined") {
        // can use window.camera = ...
        throw new Error("Need a camera (global variable)")
        return
    }

    if (before) {
        before(i, iterations, iterationsPerSecond)
    }
    // First & only render pass
    const encoder = CRAWLER_RENDERER.GPU.Device.createCommandEncoder()
    const pass = encoder.beginRenderPass({
        colorAttachments: [{
            view: CRAWLER_RENDERER.DRAW.Texture.createView(),
            resolveTarget: CRAWLER_RENDERER.GPU.Context.getCurrentTexture().createView(),
            loadOp: "clear",
            clearValue: CRAWLER_RENDERER.CONSTANTS.skyColour,
            storeOp: "store",
        }],
        depthStencilAttachment: {
            view: CRAWLER_RENDERER.DRAW.DepthTexture.createView(),
            depthClearValue: 1.0,
            depthLoadOp: "clear",
            depthStoreOp: "store"
        }
    })
    camera.UpdateVariableBuffers()
    // holds all point light attributes in a flat array
    const pointLightBuffer = []
    // so i can see how many lights there are in the shader
    let pointLength = 0
    CRAWLER_RENDERER.CONSTANTS.LIGHTS.Point.forEach((light) => {
        pointLightBuffer.push(...light.LightProperties)
        pointLength ++
    })
    // holds all spot light attributes in a flat array
    const spotLightBuffer = []
    // so i can see how many lights there are in the shader
    let spotLength = 0
    CRAWLER_RENDERER.CONSTANTS.LIGHTS.Spot.forEach((light) => {
        spotLightBuffer.push(...light.LightProperties)
        spotLength ++
    })
    // holds all directional light attributes in a flat array
    const directionalLightBuffer = []
    // so i can see how many lights there are in the shader
    let directionalLength = 0
    CRAWLER_RENDERER.CONSTANTS.LIGHTS.Directional.forEach((light) => {
        directionalLightBuffer.push(...light.LightProperties)
        directionalLength ++
    })
    
    CRAWLER_RENDERER.GPU.Device.queue.writeBuffer(CRAWLER_RENDERER.DRAW.PointLightPropertiesBuffer, 0, new Float32Array(pointLightBuffer))
    CRAWLER_RENDERER.GPU.Device.queue.writeBuffer(CRAWLER_RENDERER.DRAW.PointLightCountBuffer, 0, new Uint32Array([pointLength]))
    CRAWLER_RENDERER.GPU.Device.queue.writeBuffer(CRAWLER_RENDERER.DRAW.SpotLightPropertiesBuffer, 0, new Float32Array(spotLightBuffer))
    CRAWLER_RENDERER.GPU.Device.queue.writeBuffer(CRAWLER_RENDERER.DRAW.SpotLightCountBuffer, 0, new Uint32Array([spotLength]))
    CRAWLER_RENDERER.GPU.Device.queue.writeBuffer(CRAWLER_RENDERER.DRAW.DirectionalLightPropertiesBuffer, 0, new Float32Array(directionalLightBuffer))
    CRAWLER_RENDERER.GPU.Device.queue.writeBuffer(CRAWLER_RENDERER.DRAW.DirectionalLightCountBuffer, 0, new Uint32Array([directionalLength]))
    
    pass.setPipeline(CRAWLER_RENDERER.PIPELINES.MainRenderTrianglePipeline)
    // combine them so i can draw all triangle list shapes using the triangle pipeline
    // have the second array for indexing shapes more conveniently
    const objectArray = CRAWLER_RENDERER.CONSTANTS.TriangleListShapes.concat(CRAWLER_RENDERER.CONSTANTS.TriangleListShapes2)
    objectArray.forEach((object) => {
        object.Draw(pass, camera.BindGroup, CRAWLER_RENDERER.DRAW.LightBindGroup)
        if (objectFunction) {
            objectFunction(object)
        }
    })
    pass.setPipeline(CRAWLER_RENDERER.PIPELINES.MainRenderLinePipeline)
    // draw all line list shapes using the line pipeline
    CRAWLER_RENDERER.CONSTANTS.LineListShapes.forEach((object) => {
        object.Draw(pass, camera.BindGroup, CRAWLER_RENDERER.DRAW.LightBindGroup)
        if (objectFunction) {
            objectFunction(object)
        }
    })

    
    pass.end()
    CRAWLER_RENDERER.GPU.Device.queue.submit([encoder.finish()])
    
    if (after) {
        after(i, iterations, iterationsPerSecond)
    }
}