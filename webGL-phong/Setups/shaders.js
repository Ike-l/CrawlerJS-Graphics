import { gl } from "./setup.js"

const vertexShaderText = `
  precision mediump float;
  
  attribute vec3 vertPosition;
  attribute vec3 vertNormal;
  attribute vec3 vertColor;

  varying vec3 fragColor;
  varying vec3 fragNormal;
  varying vec3 fragPosition;
  
  uniform mat4 mWorld;
  
  uniform mat4 mView;
  
  uniform mat4 mProj;
  
  uniform mat4 mNormal;

  void main() {
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
    
    fragColor = vertColor;
    fragNormal = mat3(mNormal) * vertNormal;
    fragPosition = vec3(mWorld * vec4(vertPosition, 1.0));
  }
`

const fragmentShaderText = `
  precision mediump float;

  varying vec3 fragColor;
  varying vec3 fragNormal;
  varying vec3 fragPosition;

  uniform vec3 Ambient;
  uniform vec3 Diffuse;
  uniform vec3 Specular;
  uniform vec3 Emissive;
  uniform float Shiny;
  uniform float Opacity;

  #define MAX_LIGHTS 100

  uniform int numOfLights;
  uniform vec3 lightPositions[MAX_LIGHTS];
  uniform vec3 lightColors[MAX_LIGHTS];
  uniform float lightIntensities[MAX_LIGHTS];
  
  uniform float lightConstant[MAX_LIGHTS];
  uniform float lightLinear[MAX_LIGHTS];
  uniform float lightQuadratic[MAX_LIGHTS];
  
  uniform vec3 cameraPosition;

  void main() {
    vec3 result = vec3(0.0);

   result = Ambient;
    vec3 norm = normalize(fragNormal);
    for (int i = 0; i < MAX_LIGHTS; i++) {
        if (i >= numOfLights) break;
        
        float distance = length(lightPositions[i] - fragPosition);
        float attenuation = 1.0 / (lightConstant[i] + lightLinear[i] * distance + lightQuadratic[i] * (distance * distance));
        
        vec3 lightDir = normalize(lightPositions[i] - fragPosition);
        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = (diff * Diffuse);

        vec3 viewDir = normalize(cameraPosition - fragPosition);
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), Shiny);
        vec3 specular = (Specular * spec);
        //result = reflectDir;
        //result = vec3(diff, diff, diff);
        result += (diffuse + specular) * lightColors[i] * lightIntensities[i] * attenuation;
    }
    gl_FragColor = vec4(result * fragColor, Opacity);
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


