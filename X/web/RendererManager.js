window.initRendererGlobal = async function initRendererGlobal() {
    // utilities
    let Utilities = await import("./Utilities/Utilities.js")
    Utilities = Utilities.default
    const UTILITIES = { Utilities }

    // world
    let Camera = await import("./World/Camera.js")
    Camera = Camera.default
    let Controller = await import("./World/Controller.js")
    Controller = Controller.default
    const WORLD = { Camera, Controller }

    // 2D shapes
    let Plane = await import("./Shapes/2D/Plane.js")
    Plane = Plane.default
    let Circle = await import("./Shapes/2D/Circle.js")
    Circle = Circle.default
    let Line = await import("./Shapes/2D/Line.js")
    Line = Line.default
    let A2BLine = await import("./Shapes/2D/A2BLine.js")
    A2BLine = A2BLine.default
    let Ray = await import("./Shapes/2D/Ray.js")
    Ray = Ray.default
    const TWOD = { Plane, Circle, Line, A2BLine, Ray }

    // 3D shapes
    let Cube = await import("./Shapes/3D/Cube.js")
    Cube = Cube.default
    let Sphere = await import("./Shapes/3D/Sphere.js")
    Sphere = Sphere.default
    let Cylinder = await import("./Shapes/3D/Cylinder.js")
    Cylinder = Cylinder.default
    const THREED = { Cube, Sphere, Cylinder }

    const SHAPES = { TWOD, THREED }

    // lights
    let DefaultPointLight = await import("./Shapes/Lights/Lights/DefaultPointLight.js")
    DefaultPointLight = DefaultPointLight.default
    const POINT = { DefaultPointLight }
    
    let DefaultDirectionalLight = await import("./Shapes/Lights/Lights/DefaultDirectionalLight.js")
    DefaultDirectionalLight = DefaultDirectionalLight.default
    const DIRECTIONAL = { DefaultDirectionalLight }
    
    let DefaultSpotLight = await import("./Shapes/Lights/Lights/DefaultSpotLight.js")
    DefaultSpotLight = DefaultSpotLight.default
    const SPOT = { DefaultSpotLight }

    const LIGHTS = { POINT, DIRECTIONAL, SPOT }

    // materials
    let Material = await import("./Shapes/Materials/Material.js")
    Material = Material.default
    const MATERIALS = { Material }

    // initialise the global variable so i can use it when importing the next modules / setting it up
    window.CRAWLER_RENDERER = { WORLD, SHAPES, LIGHTS, MATERIALS, UTILITIES }

    let SetupWebGPU = await import("./GPU/Setup.js")
    SetupWebGPU = SetupWebGPU.default
    CRAWLER_RENDERER.GPU = await SetupWebGPU() 
    CRAWLER_RENDERER.GPU.MSAACount = 4
    let SetupLayouts = await import("./GPU/Layouts.js")
    SetupLayouts = SetupLayouts.default
    CRAWLER_RENDERER.GPU.LAYOUTS = await SetupLayouts()
    let SetupShaders = await import("./Shaders/Shaders.js")
    SetupShaders = SetupShaders.default
    CRAWLER_RENDERER.SHADERS = await SetupShaders()
    let SetupPipelines = await import("./GPU/Pipelines.js")
    SetupPipelines = SetupPipelines.default
    CRAWLER_RENDERER.PIPELINES = await SetupPipelines()
    let Creation = await import("./GPU/Create.js")
    CRAWLER_RENDERER.GPU.CREATION = Creation
    
    const getTexture = CRAWLER_RENDERER.GPU.CREATION.createTexture

    // default, boiler plate objects used as constants in the draw function/loop
    const Texture = getTexture(CRAWLER_RENDERER.GPU.CanvasFormat, GPUTextureUsage.RENDER_ATTACHMENT)
    const DepthTexture = getTexture("depth24plus", GPUTextureUsage.RENDER_ATTACHMENT)
    const PointLightPropertiesBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Point light property Buffer", 4800, "UNIFORM")
    const PointLightCountBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Point light Count Buffer", 4, "UNIFORM")
    const SpotLightPropertiesBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Spot light property Buffer", 6400, "UNIFORM")
    const SpotLightCountBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Spot light Count Buffer", 4, "UNIFORM")
    const DirectionalLightPropertiesBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Directional light property Buffer", 4800, "UNIFORM")
    const DirectionalLightCountBuffer = CRAWLER_RENDERER.GPU.CREATION.createBuffer("Directional light Count Buffer", 4, "UNIFORM")
    
    const LightBindGroup = CRAWLER_RENDERER.GPU.CREATION.createBindGroup("Light bind group", CRAWLER_RENDERER.GPU.LAYOUTS.LightBindGroupLayout, [PointLightPropertiesBuffer, DirectionalLightPropertiesBuffer, SpotLightPropertiesBuffer, PointLightCountBuffer, DirectionalLightCountBuffer, SpotLightCountBuffer])

    let Draw = await import("./World/Draw.js")
    Draw = Draw.default
    // default, boiler plate objects used as constants in the draw function/loop
    CRAWLER_RENDERER.DRAW = { Draw, Texture, DepthTexture, PointLightPropertiesBuffer, PointLightCountBuffer, SpotLightPropertiesBuffer, SpotLightCountBuffer, DirectionalLightPropertiesBuffer, DirectionalLightCountBuffer, LightBindGroup}
    
    CRAWLER_RENDERER.CONSTANTS = {
        // default sky colour
        skyColour: { r: 0.523, g: 0.808, b: 0.922, a: 1 },
        // arrays to put shapes, lights into
        TriangleListShapes: [],
        TriangleListShapes2: [],
        LineListShapes: [],
        LIGHTS: {Point: [], Spot: [], Directional: []}
    }
}

