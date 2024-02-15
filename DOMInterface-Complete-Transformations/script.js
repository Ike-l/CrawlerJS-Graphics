import * as SVG from "./DOM/SVG/SVGManager.js"
import * as TAG from "./DOM/TAG/TAGManager.js"
// pointer lock

//const canvas = new TAG.Canvas({backgroundColor: "#f0f0f0", context: "2d", width: 100, height: 200, x: "50px", y: "60px"})
const canvas = new TAG.Canvas({pointerLock: true, x: "50px", y: "50px", backgroundColor: "red", context: "2d", autoSize: true, widthScale: 0.5, heightScale: 0.5})
canvas.Resize()
function test(evt) {
    console.log(this)
    console.log(evt)
    console.log(arguments)
    //console.log("test", Object.entries(arguments))
}
const button = new TAG.Button({pointerLock: true, func: test, funcArgs: [1, 3], x: "70px", y: "70px", text: "Test", width: "100px", height: "100px"})

function onInput(value, prevValue, evt, index) {
    shapes[index].rotate((value-prevValue) * 2 )
}
const shapes = []

const slider = new TAG.Slider({funcArgs: [0], step: Math.PI/100, zIndex: 2, func: onInput, min: 0, max: Math.PI, width: "500px", height: "40px", x: "35px", y:"60px"})




function test2() {
    console.log(arguments)
}
function test3() {
    console.log(arguments)
}
const svg = new SVG.SVGElement({width: window.innerWidth, height: window.innerHeight, autoSize: true, widthScale: 1, heightScale: 1})
// const text = new SVG.SVGText({x: 30, y: 30, fontSize: "20px", text: "this is text", color:"red"})
// const textSpan = new SVG.SVGTextSpan({parent: text, text: "Span"})
// svg.Add(text)

shapes.push(new SVG.SVGCircle({
    radius: 40,
    x: 200,
    y:200,
    fill: "green",
    func: {
        "main": test,
        "ae2": test2,
    },
    arguments: {
        "main": ["main again"],
        "ae2": ["ae2 again"],
    },
    attributes: {
        "main": {},
        "ae2": {
            fill:"purple",
            x:0.3,
            y:0.8,      
            shape:"rect",
            width:50,
            height:50,
        },
    },
    defaultButtons: true,
}))

for (let i = 0; i< 10; ++i) {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    const colR = r.toString(16).padStart(2, '0')
    const colG = g.toString(16).padStart(2, '0')
    const colB = b.toString(16).padStart(2, '0')
    const col = `#${colR}${colG}${colB}`
    shapes.push(new SVG.SVGRectangle({x: 350, y: 300, width: 250, height: 500, fill: col, strokeWidth: 0.1}))
}
shapes.push(new SVG.SVGRectangle({x: 350, y: 300, width: 250, height: 250, fill: "yellow", strokeWidth: 0.1}))
shapes.push(new SVG.SVGRectangle({x: 350, y: 300, width: 250, height: 250, fill: "purple", strokeWidth: 0.1}))
shapes.push(new SVG.SVGRectangle({x: 350, y: 300, width: 250, height: 250, fill: "blue", strokeWidth: 0.1}))
shapes.push(new SVG.SVGRectangle({x: 300, y: 300, width: 250, height: 250, fill: "red", strokeWidth: 0.1, defaultButtons: true}))
shapes.push(new SVG.SVGRectangle(
    {
    x: 350,
    y: 300,
    width: 250,
    height: 250,
    fill: "grey",
    strokeWidth: 0.1,
    func: {
        
        "ae3": test3,
    },
    arguments: {
        "ae3": ["ae3 again"],
    },
    attributes: {
        "ae3": {
            fill:"red",
            x:1,
            y:0.5,      
            shape:"rect",
            width:50,
            height:50,
        }
    }
}))

svg.Add(...shapes)
function loop() {
    canvas.Draw()
    //shapes[shapes.length-1].rotate(0.001)
    requestAnimationFrame(loop)
}

loop()
/*
//svg.Remove(shapes[0])
//svg.remove(0)

let frameCount = 0

 function loop() {
    frameCount++
     //text.setPosition(250, 30)
     shapes[shapes.length-1].rotate(0.1)
     requestAnimationFrame(loop)
 }
 loop()
 */

// push back when subtract

// recursive appendChild removeChild when hits SVG, otherwise pushes next in line

             //{x: 0, y: 0.5, shape: "rect", width: 50, height: 50, directionX: -1, directionY: 0, ButtonType: "scale"},
             //{x: 0.5, y: 0, shape: "rect", width: 50, height: 50, directionX: 0, directionY: -1, ButtonType: "scale"},
            // {x: 0.5, y: 0.5, shape: "rect", width: 50, height: 50, ButtonType: "rotate", Color: "purple"},
            //{x: 1, y: 0.5, shape: "rect", width: 50, height: 50, directionX: 1, directionY: 0, ButtonType: "scale"},
            //{x: 0.5, y: 1, shape: "rect", width: 50, height: 50, directionX: 0, directionY: 1, ButtonType: "scale"},

// ctrl z, ctrl y undo redo


// let bbox = rect.element.getBBox()
// let bboxRect = new SVGRectangle({
//              scale: rect.scale,
//              translation: rect.translation,
//              rotation: rect.rotation,
//             x: bbox.x,
//             y: bbox.y,
//             width: bbox.width,
//             height: bbox.height,
//             fill: "none",
//             strokeWidth: 0.5,
//             stroke: "red"
//         })

// svg.Add(bboxRect)

         // neeed to see bbox
        //  rect.rotateRads(0.5)
        //  rect.translate([0, 20])
        //  bbox = rect.element.getBBox()
        //  svg.Remove(bboxRect)
        //   bboxRect = new SVGRectangle({
        //      scale: rect.scale,
        //      translation: rect.translation,
        //      rotation: rect.rotation,
        //      parent: svg,
        //     x: bbox.x,
        //     y: bbox.y,
        //     width: bbox.width,
        //     height: bbox.height,
        //     fill: "none",
        //     strokeWidth: 0.5,
        //     stroke: "red"
        // })
 // window.addEventListener("mousemove", (evt) => {
 //     rect.translate([0.1, 0.1])
 //     rect.rotateRads(0.01)
 //     rect.stretch([0.1, 0.1])
 // })

//  document.addEventListener('keydown', function(evt) {
 //     if (evt)
 //     if (evt.key == "u") {
 //         rect2.stretch([2,2])
 //     }
 //     if (evt.key == "i") {
 //         rect2.stretch([0,1/2])
 //     }
 //     if (evt.key == "j") {
 //         rect2.stretch([0.1,0])
 //     }
 //     if (evt.key == "k") {
 //         rect2.stretch([-0.1,0,])
 //     }
 //     if (evt.key == "h") {
 //         rect2.rotate(0.1)
 //     }
 //     if (evt.key == "g") {
 //         rect2.rotate(-0.1)
 //     }
 // })
       /* switch(evt.key) {
            case "a":
                const aa = shapes[0].element.getBBox()
                const bb = new SVG.SVGRectangle({x:aa.x, y:aa.y, width:aa.width, height: aa.height})
                svg.Add(bb) 
                break
            case "b":
                break
            case "c":
                break
            case "d":
                break
            case "e":
                break
            case "f":
                break
            case "g":
                break
        }
})*/

/*
have shapes accessible in shapeSVG
pointer lock
    //DisplayEditButtons() {
        // have buttons already them already
        // assign functions to events - if created no need for multiple times
        // |- Movement -> either scale or rotate, can only go 1 direction 
        // |-- scale when moved passes movement to scale of object
        // |- rotate when moved get angle 
        // align with applying the matrix - synchronise them using element.BBox()
        // append to the parent
    //}

*/

/*
rotate point (x, y) by d rads:

xnew = xcos(d)-ysin(d)
ynew = xsin(d)+ycos(d)

*/


// used arguments when creating function so changed this.Parameters because that seemed more intuitive