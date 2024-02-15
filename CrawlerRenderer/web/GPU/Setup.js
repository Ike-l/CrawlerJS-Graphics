// for boiler plate code and browser compatability checking
export default async function SetupWebGPU() {
    const Canvas = new CRAWLER_INTERFACE.TAGS.TAGCanvas({width: "100%", height: "100%", pointerLock: true, context: "webgpu"})
    
    if (!navigator.gpu) {
        const SVG = new CRAWLER_INTERFACE.SVGS.SVGSVG({width: "100%", height: "100%"})
        // no longer necessary to use the hold function 
        const gitgudRect = new CRAWLER_INTERFACE.SVGS.SVGRectangle({parent: SVG, width: "1000px", height: "1000px", fill: "#adadad", moveable: false, textEditable: false})
        CRAWLER_INTERFACE.UTILITY.Utility.Hold({fn: gitgudRect.Write, scope: gitgudRect, args: ["WebGPU not supported on this browser!", false, true], delay: 1000})
        CRAWLER_INTERFACE.UTILITY.Utility.Hold({fn: gitgudRect.Write, scope: gitgudRect, args: ["Please follow: 'https://caniuse.com/?search=webGPU'", false, false], delay: 1000})

        CRAWLER_INTERFACE.UTILITY.Utility.Hold({fn: gitgudRect.StartNewLine, scope: gitgudRect, args: [100], delay: 1000})
        
        
      throw new Error("WebGPU not supported on this browser.")
    }
    
    const adapter = await navigator.gpu.requestAdapter()
    if (!adapter) {
      throw new Error("No appropriate GPUAdapter found.")
    }
    const Device = await adapter.requestDevice()
    
    const Context = Canvas.Context
    Context.canvas.width = Canvas.AbsoluteWidth
    Context.canvas.height = Canvas.AbsoluteHeight
    const CanvasFormat = navigator.gpu.getPreferredCanvasFormat()
    Context.configure({
      device: Device,
      format: CanvasFormat,
    })

    return {
        Device,
        Context,
        Canvas,
        CanvasFormat,
    }
}