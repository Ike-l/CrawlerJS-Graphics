import Util from "./Utils/Utilities.js"
import { gl, canvas } from "./Setups/setup.js"
import { program } from "./Setups/program.js"
import {} from "./Events/inputs.js"
import { Shape } from "./Shapes/Shape.js"
import { Line } from "./Shapes/2D/Line.js"
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
let camera
let projector
/*
SETUP ORIENTATION FOR CAMERA INIT INCLUDING JUST LOOKING AT AXIS +VE AND -VE SO {axis: [1,0,0], direction:+-1}
*/
function setup() {
    camera = new Camera({
        center: [0, 8, 0],
})
    projector = new Projector({
        FOV: Util.toRad(45)
})
}

function frpese(fps) {
    //console.log(fps)
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
            objects.forEach(function(object) {
                object.scale([4, 3, 3])
                })
            break
        case "o":
            objects[7].rotate(Math.PI/10, [0, 0, 1])
            break
        case "i":
            objects.forEach(function(object) {
                object.translate([3, 2, 1])
            })
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

function draw() {
    objects.forEach(function(object) {
        object.render()
       //if (object != objects[0]) object.rotate(Math.PI/1000, [0, 1, 0])
    })   
}



function setupDefaults() {
    //objects.push(new Plane({width: 10000, length: 10000, center: [0, -1, 0]}))
    objects.push(new Line())
    objects.push(new Circle())
    objects.push(new Ray())
    objects.push(new Plane())
    objects.push(new Cube())
    objects.push(new Cylinder())
    objects.push(new Sphere())
    let increment = -objects.length/2
    objects.forEach(function(object) {
        object.translate([0, 0, increment++])
    })
}

function testSphereNormals() {
    objects.push(new Sphere())
    objects[0].normals.forEach(function(normalDirection) { //Wont work anymore cause normals have changed so not 2D array
        objects.push(new Ray({
            //center: normalDirection,
            direction: normalDirection,
            color: Util.Colors.PURPLE
        }))
    })
}

function main() {
    objects.push(new Plane({width: 100, length: 100}))
    objects.push(new Sphere({center: [0, 1, 0]}))
    objects.push(new Sphere({center: [0, 2, 0]}))
    objects.push(new Sphere({center: [0, 3, 0]}))
    objects.push(new Sphere({center: [0, 10, 0]}))
    objects.push(new Sphere({center: [10, 10, 0]}))
    objects.push(new Sphere({center: [10, 0, 0]}))
    objects.push(new Cube({center: [3, 3, 3], lighting: World.Lights.DefaultPoint}))
    objects.push(...Util.generateGrid({length: 100}))
    objects.push(...Util.generateRandomObjects())
    //testSphereNormals()
}

main()

//setupDefaults()

export { setup, frpese, key, move, draw, camera, projector }
