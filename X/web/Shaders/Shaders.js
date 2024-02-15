export default async function SetupShaders() {
    const MainRenderShader = CRAWLER_RENDERER.GPU.Device.createShaderModule({
        label: "Main Render Shader",
        code: `
            struct VertexInput {
                @location(0) position: vec3f,
                @location(1) colour: vec3f,
                @location(2) normal: vec3f,
                // shader locations defined in the pipeline
            };

            struct VertexOutput {
                @builtin(position) position: vec4f,
                @location(0) Normal: vec3f,
                @location(1) Position: vec3f
                // shader locations defined in the pipeline
            };

            struct FragInput {
                @location(0) Normal: vec3f,
                @location(1) Position: vec3f
            }

            struct Material {
                ambience: vec3f,
                diffusivity: vec3f,
                specularity: vec3f,
                shininess: f32
            }

            struct Matrices {
                modelMatrix: mat4x4<f32>,
                normalMatrix: mat4x4<f32>,
                projectionViewMatrix: mat4x4<f32>
            }

            struct PointLight {
                position: vec3f,
                colour: vec3f,
                intensity: f32,
                attenuation: vec3f,
            }
            struct DirecitonalLight {
                position: vec3f,
                colour: vec3f,
                intensity: f32,
                direction: vec3f,
            }
            struct SpotLight {
                position: vec3f,
                colour: vec3f,
                intensity: f32,
                direction: vec3f,
                innerCone: f32,
                outerCone: f32,
            }

            struct PointLightBuffer {
                lights: array<PointLight, 100>
            }
            struct DirectionalLightBuffer {
                lights: array<DirecitonalLight, 100>
            }
            struct SpotLightBuffer {
                lights: array<SpotLight, 100>
            }

            @group(0) @binding(0) var<uniform> modelMatrix: mat4x4<f32>;
            @group(0) @binding(1) var<uniform> normalMatrix: mat4x4<f32>;

            @group(1) @binding(0) var<uniform> ambience: vec3f;
            @group(1) @binding(1) var<uniform> diffusivity: vec3f; 
            @group(1) @binding(2) var<uniform> specularity: vec3f; 
            @group(1) @binding(3) var<uniform> shininess: f32;
            
            @group(2) @binding(0) var<uniform> projectionViewMatrix: mat4x4<f32>;
            @group(2) @binding(1) var<uniform> cameraPosition: vec3f;

            @group(3) @binding(0) var <uniform> pointLightBuffer: PointLightBuffer;
            @group(3) @binding(1) var <uniform> directionalLightBuffer: DirectionalLightBuffer;
            @group(3) @binding(2) var <uniform> spotLightBuffer: SpotLightBuffer;
            @group(3) @binding(3) var <uniform> pointLightCount: u32;
            @group(3) @binding(4) var <uniform> directionalLightCount: u32;
            @group(3) @binding(5) var <uniform> spotLightCount: u32;

            // strips a mat4 into a mat3
            fn mat4_to_mat3(m: mat4x4<f32>) -> mat3x3<f32> {
                return mat3x3<f32>(
                    m[0][0], m[0][1], m[0][2],
                    m[1][0], m[1][1], m[1][2],
                    m[2][0], m[2][1], m[2][2]
                );
            }

            @vertex
            fn vertexMain(input: VertexInput) -> VertexOutput  {
                let matrices: Matrices = Matrices(
                    modelMatrix,
                    normalMatrix,
                    projectionViewMatrix
                );
                
                var output: VertexOutput;
                // column heavy
                output.position = matrices.projectionViewMatrix * matrices.modelMatrix * vec4f(input.position, 1);

                let normalMatrix3: mat3x3<f32> = mat4_to_mat3(matrices.normalMatrix);
                output.Normal = normalMatrix3 * input.normal;
                
                output.Position = (matrices.modelMatrix * vec4(input.position, 1)).xyz;
                
                return output;
            }

            fn isZeroVector(vector: vec3f) -> bool {
                return vector.x == 0.0 && vector.y == 0.0 && vector.z == 0.0;
            }

            // research blinn-phong to understand how this works
            fn pointLight(input: FragInput, normal: vec3f, light: PointLight, material: Material, cameraPosition: vec3f) -> vec3f {
                var contribution = vec3f(0);
                
                let distance: f32 = length(light.position - input.Position);
                let attenuation: f32 = 1.0/(light.attenuation.x + light.attenuation.y * distance + light.attenuation.z * distance * distance);

                let lightDir: vec3f = normalize(light.position - input.Position);
                let diff: f32 = max(dot(normal, lightDir), 0.0);
                let diffuse: vec3f = diff * material.diffusivity;

                var specular: vec3f = vec3f(0);
                if (!isZeroVector(diffuse)) {
                    let viewDir: vec3f = normalize(cameraPosition - input.Position);
                    let halfWayDir: vec3f = normalize(lightDir+viewDir);
                    let spec: f32 = pow(max(dot(halfWayDir, normal), 0.0), material.shininess);
                    specular = spec * material.specularity;
                }
                
                return (diffuse+specular) * light.colour * light.intensity * attenuation;
            }
            // research blinn-phong to understand how this works
            fn spotLight(input: FragInput, normal: vec3f, light: SpotLight, material: Material, cameraPosition: vec3f) -> vec3f {
                var contribution = vec3f(0);
                
                let lightDir: vec3f = normalize(light.position - input.Position);
                let diff: f32 = max(dot(normal, lightDir), 0.0);
                let diffuse: vec3f = diff * material.diffusivity;

                let viewDir: vec3f = normalize(cameraPosition - input.Position);
                let halfWayDir: vec3f = normalize(lightDir+viewDir);
                let spec: f32 = pow(max(dot(halfWayDir, normal), 0.0), material.shininess);
                let specular: vec3f = spec * material.specularity;

                let angle: f32 = dot(light.direction, -lightDir);
                let intensity: f32 = clamp((angle - light.outerCone) / (light.innerCone - light.outerCone), 0.0, 1.0);
                
                return (diffuse+specular) * light.colour * intensity * light.intensity;
            }
            // research blinn-phong to understand how this works
            fn directionalLight(input: FragInput, normal: vec3f, light: DirecitonalLight, material: Material, cameraPosition: vec3f) -> vec3f {
                var contribution = vec3f(0);

                let lightDir: vec3f = normalize(light.direction);
                let diff: f32 = max(dot(normal, lightDir), 0.0);
                let diffuse: vec3f = diff * material.diffusivity;

                let viewDir: vec3f = normalize(cameraPosition - input.Position);
                let halfWayDir: vec3f = normalize(lightDir+viewDir);
                let spec: f32 = pow(max(dot(halfWayDir, normal), 0.0), material.shininess);
                let specular: vec3f = spec * material.specularity;
                
                return (diffuse+specular) * light.colour * light.intensity;
            }

            @fragment
            fn fragmentMain(input: FragInput) -> @location(0) vec4f {  
                let material: Material = Material(
                    ambience,
                    diffusivity,
                    specularity,
                    shininess
                );
                
                var result = material.ambience;
                let normal = normalize(input.Normal);
                for (var i: u32 = 0u; i < 100u; i = i + 1u) {
                // since if it carries over, it makes the screen black
                    if (i >= pointLightCount) {
                        break;
                    }
                    var light: PointLight = pointLightBuffer.lights[i];
                    
                    result += pointLight(input, normal, light, material, cameraPosition);
                }
                for (var i: u32 = 0u; i < 100u; i = i + 1u) {
                    if (i >= spotLightCount) {
                        break;
                    }
                    var light: SpotLight = spotLightBuffer.lights[i];

                    result += spotLight(input, normal, light, material, cameraPosition);
                }
                for (var i: u32 = 0u; i < 100u; i = i + 1u) {
                    if (i >= directionalLightCount) {
                        break;
                    }
                    var light: DirecitonalLight = directionalLightBuffer.lights[i];
 
                    result += directionalLight(input, normal, light, material, cameraPosition);
                }
                //return vec4f(result, 1.0);
                // gamma correction
                return vec4f(pow(result, vec3f(1.0/2.2)), 1.0); // 1.0 is "A" of RGBA
            }
        `
    }) 

    return {
        MainRenderShader,
    }
}
// day after?
// shadow mapping 

// days after?
// better way of indexing into arrays using labels?
// instancing
// touch up classes for better getters and setters
// establish library
// documentation for both libraries 
// have export function
// fix bug with add text manually, instead of manual flag, have an actual function  CODE{F%5Y}
// demo scene
// have object follow light source? events
// have camera follow objects
// better log coords function
// visualise normals?
// delete the dreaded DirectionalLight.js 

//let reflectDir: vec3f = reflect(-lightDir, normal);

//result = vec3f(0.15, 0.15, 0.15);
//let diffuse: vec3f = diff * vec3f(1, 1, 1);
//let specular: vec3f = spec * vec3f(0.5, 0.5, 0.5);
// to tomorrow self, the problem is the js isnt communicating the material properties correctly (nor the light properties - had to put 0 after positions, )
// nvm fixed it. 
// webgpu dumb 
// lmao repl tried auto inserting "fuck"