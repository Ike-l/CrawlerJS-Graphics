import { gl } from "../Setups/setup.js"
import { program } from "../Setups/program.js"
import { World } from "../Workspace/World.js"
import Util from "../Utils/Utilities.js"


export class Shape {
    constructor(shapeType, center, scale, rotation, type, material = Util.deepCopy(World.Materials.Default), lighting = Util.deepCopy(World.Lights.Default)) {
        this.shapeType = shapeType
        this.center = center
        this.rotation = rotation
        this.type = type
        this.material = material
        this.lighting = lighting

        this.rotationMatrix = mat4.create()
        this.scaleMatrix = mat4.create()
        this.positionMatrix = mat4.create()

        this.programInfo = {
            program: program,
            uniformLocations: {
                matWorldUniformLocation: gl.getUniformLocation(program, "mWorld"),
                matNormalUniformLocation: gl.getUniformLocation(program, "mNormal"),

                materialAmbientUniformLocation: gl.getUniformLocation(program, 'Ambient'),
                materialDiffuseUniformLocation: gl.getUniformLocation(program, 'Diffuse'),
                materialSpecularUniformLocation: gl.getUniformLocation(program, 'Specular'),
                materialShinyUniformLocation: gl.getUniformLocation(program, 'Shiny'),
                materialEmissiveUniformLocation: gl.getUniformLocation(program, 'Emissive'),
                materialOpacityUniformLocation: gl.getUniformLocation(program, 'Opacity'),
            },
            attributeLocations: {
                colorAttributeLocation: gl.getAttribLocation(program, 'vertColor'),
                positionAttributeLocation: gl.getAttribLocation(program, 'vertPosition'),
                vertexNormalAttributeLocation: gl.getAttribLocation(program, 'vertNormal')
            }
        }
        this.translate(center)
        this.rotate(rotation.angle, rotation.axis)
        this.scale(scale)

        this.positions = []
        this.normals = []
        this.colors = []
        this.indices = []

    }
    createBuffers() {
        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW)

        const colorBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW)

        const normalBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW)

        const indexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW)

        gl.bindBuffer(gl.ARRAY_BUFFER, null)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

        this.buffers = {
            "pBuffer": positionBuffer,
            "cBuffer": colorBuffer,
            "nBuffer": normalBuffer,
            "iBuffer": indexBuffer
        }
    }
    loadBuffers() {
        // default for all atm
        const numComponents = 3
        const type = gl.FLOAT
        const normalize = false
        const stride = 0
        const offset = 0
        
        // vertex positions
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.pBuffer)
        gl.vertexAttribPointer(this.programInfo.attributeLocations.positionAttributeLocation, numComponents, type, normalize, stride, offset)
        gl.enableVertexAttribArray(this.programInfo.attributeLocations.positionAttributeLocation)
        // vertex normals
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.nBuffer)
        gl.vertexAttribPointer(this.programInfo.attributeLocations.vertexNormalAttributeLocation, numComponents, type, normalize, stride, offset)
        gl.enableVertexAttribArray(this.programInfo.attributeLocations.vertexNormalAttributeLocation)
        // vertex colors
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.cBuffer)
        gl.vertexAttribPointer(this.programInfo.attributeLocations.colorAttributeLocation, numComponents, type, normalize, stride, offset)
        gl.enableVertexAttribArray(this.programInfo.attributeLocations.colorAttributeLocation)
        // triangle indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.iBuffer)
    }
    render(lightSources) {
        const worldMatrix = mat4.create()
        mat4.multiply(worldMatrix, worldMatrix, this.positionMatrix)
        mat4.multiply(worldMatrix, worldMatrix, this.rotationMatrix)
        mat4.multiply(worldMatrix, worldMatrix, this.scaleMatrix)

        const normalMatrix = mat4.create()
        mat4.invert(normalMatrix, worldMatrix)
        mat4.transpose(normalMatrix, normalMatrix)

        this.loadBuffers()

        gl.uniformMatrix4fv(this.programInfo.uniformLocations.matWorldUniformLocation, gl.FALSE, worldMatrix)
        gl.uniformMatrix4fv(this.programInfo.uniformLocations.matNormalUniformLocation, gl.FALSE, normalMatrix)

        gl.uniform3fv(this.programInfo.uniformLocations.materialAmbientUniformLocation, this.material.Ambient)
        gl.uniform3fv(this.programInfo.uniformLocations.materialDiffuseUniformLocation, this.material.Diffuse)
        gl.uniform3fv(this.programInfo.uniformLocations.materialSpecularUniformLocation, this.material.Specular)
        gl.uniform1f(this.programInfo.uniformLocations.materialShinyUniformLocation, this.material.Shiny)
        gl.uniform3fv(this.programInfo.uniformLocations.materialEmissiveUniformLocation, this.material.Emissive)
        gl.uniform1f(this.programInfo.uniformLocations.materialOpacityUniformLocation, this.material.Opacity)

        gl.uniform1i(gl.getUniformLocation(this.programInfo.program, "numOfLights"), lightSources.length);
        for (let i = 0; i < lightSources.length; i++) {
            gl.uniform3fv(gl.getUniformLocation(this.programInfo.program, `lightPositions[${i}]`), lightSources[i].lighting.Center)
            gl.uniform3fv(gl.getUniformLocation(this.programInfo.program, `lightColors[${i}]`), lightSources[i].lighting.Color)
            gl.uniform1f(gl.getUniformLocation(this.programInfo.program, `lightIntensities[${i}]`), lightSources[i].lighting.Intensity)
            // change to attenuation
            gl.uniform1f(gl.getUniformLocation(this.programInfo.program, `lightConstant[${i}]`), lightSources[i].lighting.Constant)
            gl.uniform1f(gl.getUniformLocation(this.programInfo.program, `lightLinear[${i}]`), lightSources[i].lighting.Linear)
            gl.uniform1f(gl.getUniformLocation(this.programInfo.program, `lightQuadratic[${i}]`), lightSources[i].lighting.Quadratic)
        }
        gl.drawElements(this.type, this.indices.length, gl.UNSIGNED_SHORT, 0)
    }
    translate(translation) {
        mat4.translate(this.positionMatrix, this.positionMatrix, translation)
        if (this.lighting.Type === "point") {
            vec3.add(this.lighting.Center, this.lighting.Center, translation)
        }
    }
    rotate(angle, axis) {
        const rotationQ = quat.create()
        const rotationM = mat4.create()
        quat.setAxisAngle(rotationQ, axis, angle)
        mat4.fromQuat(rotationM, rotationQ)
        //relative to own axis
        mat4.multiply(this.rotationMatrix, this.rotationMatrix, rotationM)
        // relative to world axis
        //mat4.multiply(this.rotationMatrix,rotationM, this.rotationMatrix)
    }
    scale(scale) {
        mat4.scale(this.scaleMatrix, this.scaleMatrix, scale)
    }
    getShape() {
        return this.shapeType
    }
}