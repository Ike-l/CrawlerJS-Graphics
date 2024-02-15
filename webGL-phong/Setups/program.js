import { gl } from "./setup.js"
import { vertexShader, fragmentShader } from "./shaders.js"
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
       console.error("ERROR linking program!", gl.getProgramInfoLog(program))
        
    }

    // For debug will delete later?
    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error("ERROR validating program!", gl.getProgramInfoLog(program))
        
    }

export { program }