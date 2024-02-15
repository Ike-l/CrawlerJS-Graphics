function createTexture(format, usage) {
    return CRAWLER_RENDERER.GPU.Device.createTexture ({
        // uses global variables, format is a canvas format or depth testing etc. usage is from a texture
        size: [CRAWLER_RENDERER.GPU.Canvas.AbsoluteWidth, CRAWLER_RENDERER.GPU.Canvas.AbsoluteHeight],
        sampleCount: CRAWLER_RENDERER.GPU.MSAACount,
        format: format,
        usage: usage
    })
}

function createBuffer(label, size, usage) {
    return CRAWLER_RENDERER.GPU.Device.createBuffer({
        label: label, // used when debugging
        size: size, // byteLength
        usage: GPUBufferUsage[usage] | GPUBufferUsage.COPY_DST
    })
}
// self explanatory 
function createBindGroup(label, layout, buffers) {
    let bindingCount = 0
    const entries = []
    buffers.forEach(buffer => {
        entries.push({
            binding: bindingCount++,
            resource: { buffer: buffer }
        })
    })
    return CRAWLER_RENDERER.GPU.Device.createBindGroup({
        label: label, // used when debugging
        layout: layout,
        entries: entries
    })
}

export { createTexture, createBuffer, createBindGroup }