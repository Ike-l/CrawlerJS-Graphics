import { gl, canvas } from "../Setups/setup.js"
import { program } from "../Setups/program.js"


export class Projector {
        constructor(parameters = {}) {
            this.FOV = parameters.FOV || Math.PI / 4
            this.AspectRatio = parameters.AspectRatio || canvas.width / canvas.height
            this.near = parameters.near || 0.1
            this.far = parameters.far || 1000
            this.zoomed = false
            this.projMatrix = mat4.create()

            this.programInfo = {
                uniformLocations: {
                    matProjUniformLocation: gl.getUniformLocation(program, "mProj")
                }
            }
            
            this.project()
        }
        project() {
            mat4.perspective(this.projMatrix, this.FOV, this.AspectRatio, this.near, this.far)
        }
        reload() {
        this.project()
            gl.uniformMatrix4fv(this.programInfo.uniformLocations.matProjUniformLocation, gl.FALSE, this.projMatrix)
        }
    }