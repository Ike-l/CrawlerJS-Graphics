import { gl } from "./setup.js"

const vertexShaderText = `
  precision mediump float;
  
  attribute vec3 vertPosition;
  attribute vec3 vertNormal;
  attribute vec3 vertColor;
  
  varying vec3 fragColor;
  varying vec3 vLighting;
  varying float opacity;
  
  uniform vec3 Ambient;
  uniform vec3 Diffuse;
  uniform vec3 Specular;
  uniform float Shiny;
  uniform vec3 Emissive;
  uniform float Opacity;

  uniform int lightType;
  uniform vec3 lightColor;
  uniform float lightIntensity;
  
  uniform mat4 mWorld;
  uniform mat4 mView;
  uniform mat4 mProj;
  uniform mat4 mNormal;

  void main() {
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);

    highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

    highp vec4 transformedNormal = mNormal * vec4(vertNormal, 1.0);

    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientLight + (directionalLightColor * directional);

    opacity = Opacity;
    fragColor = vertColor;
  }
`

const fragmentShaderText = `
  precision mediump float;
  
  varying float opacity;
  varying vec3 fragColor;
  varying highp vec3 vLighting;

  void main() {
  gl_FragColor = vec4(fragColor * vLighting, opacity);
  }
`



    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, vertexShaderText)
    gl.shaderSource(fragmentShader, fragmentShaderText)

    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error("ERROR compiling vertex shader!", gl.getShaderInfoLog(vertexShader))
        
    }
    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(fragmentShader))
        
    }
    export { vertexShader, fragmentShader }


