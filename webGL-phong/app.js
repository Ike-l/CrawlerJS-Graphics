import Util from "./Utils/Utilities.js"
//import { gl, canvas } from "./Setups/setup.js"
//import { program } from "./Setups/program.js"
import {} from "./Events/inputs.js"
//import { Shape } from "./Shapes/Shape.js"
import { Line } from "./Shapes/2D/Line.js"
import { AtoBLine } from "./Shapes/2D/AtoBLine.js"
import { Circle } from "./Shapes/2D/Circle.js"
import { Sphere } from "./Shapes/3D/Sphere.js"
import { Plane } from "./Shapes/2D/Plane.js"
import { Cube } from "./Shapes/3D/Cube.js"
import { Cylinder } from "./Shapes/3D/Cylinder.js"
import { Camera } from "./Workspace/Camera.js"
import { Projector } from "./Workspace/Projector.js"
import { World } from "./Workspace/World.js"
import { Ray } from "./Shapes/2D/Ray.js"

const objects = []
const lightSources = []
let camera
let projector
/*
SETUP ORIENTATION FOR CAMERA INIT INCLUDING JUST LOOKING AT AXIS +VE AND -VE SO {axis: [1,0,0], direction:+-1}
*/
function setup() {
    camera = new Camera({
        center: [-30, 3, 10],
        lookingAt: [20, 5, 0]
})
    projector = new Projector({
        FOV: Util.toRad(45)
})
}

function frpese(fps) {
    //console.log("fps: "+fps)
}


function key(key) {
    switch(key) {
        case "w":
            camera.forward(1)
            break
        case "a":
            camera.left(1)
            break
        case "s":
            camera.backward(1)
            break
        case "d":
            camera.right(1)
            break
        case "Shift":
            camera.down(1)
            break
        case " ":
            camera.up(1)
            break
        case "u":
            console.log(camera.yaw, "yaw")
            console.log(camera.pitch, "pitch")
            break
        case "p":
            lightSources[1].rotate(Math.PI / 100, [0, 1, 0])
            break
        case "o":
            lightSources[1].scale([1, 1, 2])
            break
        case "i":
            lightSources[1].translate([0, 0, 1])
            break
        case "k":
            console.log("Na")
            break
        case "f":
            camera.pitch = Math.PI/2 - 1e-10
            break
        default:
            console.log("pressed: "+key)
            break
    }
}

function move(moveY, moveX) {
    if (typeof camera!="undefined") {
        const sensitivity = 1e-3
        // short circuit evaluation
        camera.addPitch(moveY * -sensitivity || 0)
        camera.addYaw(moveX * sensitivity || 0)
    }
}
let abc = 0
function draw() {
    objects.forEach(function(object) {
        object.render(lightSources)
        if (object.getShape() != "plane" && object.getShape() != "line") {
        //object.rotate(Math.PI/1000, [0,1,0])
            //object.translate([0.001,0,0])
        }
    }) 
    lightSources.forEach(function(source) {
        source.lighting.Center = source.center
        source.material.Ambient = source.lighting.Color
        source.render(lightSources)
    })
    
}

function setupMain() {
    objects.push(new Plane({width: 100}))
    //objects.push(new Sphere({center: [0, 1, 0], radius: 3, material: Util.deepCopy(World.Materials.Transparent)}))
    objects.push(new Sphere({center: [0, 2, 0]}))
   lightSources.push(new Sphere({center: [200, 30, 0], radius: 30, lighting: Util.deepCopy(World.Lights.sunPoint)}))
    objects.push(new Sphere({center: [0, 10, 0], material: Util.deepCopy(World.Materials.Transparent)}))
    objects.push(new Sphere({center: [10, 10, 0]}))
    objects.push(new Sphere({center: [10, 1, 0]}))
   lightSources.push(new Cube({center: [-4, 3, -4], lighting: Util.deepCopy(World.Lights.redPoint), material: Util.deepCopy(World.Materials.Light)}))
    objects.push(new Cube({center: [-4, 3, -6]}))
    objects.push(new Cube({center: [-6, 3, -6]}))
    objects.push(new Cube({center: [-6, 3, -4]}))
    objects.push(new Sphere({center: [-4, 6, -4]}))
    objects.push(new Sphere({center: [-4, 5, -4]}))
    lightSources.push(new Cube({center: [4, 3, 4], lighting: Util.deepCopy(World.Lights.bluePoint), material: Util.deepCopy(World.Materials.Light)}))

    //objects.push(new Cube({center: [-4, 3, -6]}))
    
    //objects.push(new Cube({center: [-3, 6, 3]}))
   // objects.push(new Cube({center: [-1, 2, 1]}))
    objects.push(new Cylinder({center: [4, 3, 6]}))
    //objects.push(new Ray({center: [-31, 6, 31], direction: [0, 6, 30], normalised: false}))
   // objects.push(new AtoBLine({pointB: [20, 3, -30], pointA: [-4, -4, 3]}))
    //objects.push(new AtoBLine({pointB: [0, 0, 3], pointA: [0, 0, 0]}))
   // objects.push(new Circle({center: [0, 1, 0]}))
    //objects.push(new Line({length: 10, center: [1, 1, 0], rotation: {angle: Math.PI/2, axis: [0, 1, 0]}}))
   // objects.push(new Cube({center: [30, 6, 30], width:10}))
   // objects.push(new Cube({center: [-30, 6, -30], width:40}))
    //objects.push(...Util.generateGrid({length: 100}))
    //objects.push(...Util.generateRandomObjects())

    
}

function forShow() {
    objects.push(new Plane({width: 2000, length: 2000, material: Util.deepCopy(World.Materials.BlueDefault)}))
    lightSources.push(new Sphere({/*quality: 120,*/ center: [100, 50, 0], radius: 30, lighting: Util.deepCopy(World.Lights.sunPoint)}))
    //lightSources.push(new Sphere({radius: 5, center: [0, 0, -10], lighting: Util.deepCopy(World.Lights.bluePoint)}))
    //lightSources.push(new Sphere({radius: 5, center: [0, 0, 10], lighting: Util.deepCopy(World.Lights.redPoint)}))
    
    objects.push(new Sphere({
        radius: Util.random(3),
        center: [Util.random(-10, 10), Util.random(10), Util.random(-10, 10)]
    }))
    objects.push(new Sphere({
        radius: Util.random(5),
        center: [Util.random(-10, 10), Util.random(10), Util.random(-10, 10)]
    }))
    objects.push(new Sphere({
        radius: Util.random(7),
        center: [Util.random(-10, 10), Util.random(10), Util.random(-10, 10)]
    }))
    objects.push(new Sphere({
        radius: Util.random(9),
        center: [Util.random(-10, 10), Util.random(10), Util.random(-10, 10)]
    }))
    objects.push(new Cylinder({
        center: [-6, 3, -6]}))

    
}

//forShow()
setupMain()

export { setup, frpese, key, move, draw, camera, projector }
/*
1123 lines of code as of 18:22 27/08/2023
*/