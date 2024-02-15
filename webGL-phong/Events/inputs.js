import { gl, canvas } from "../Setups/setup.js"
import { program } from "../Setups/program.js"
import { setup, frpese, key, move, draw, camera, projector } from "../app.js"

const times = [];
let fps;

document.addEventListener('keydown', function(evt) {
        key(evt.key) 
})

document.addEventListener('mousemove', function(evt) {
        move(evt.movementY, evt.movementX) 
})

let lastTouchX = 0
let lastTouchY = 0
let initialX = 0
let initialY = 0
let tapCount = 0
let tapTimer
const threshold = 10
document.addEventListener('touchstart', function(evt) {
    initialX = evt.touches[0].clientX
    initialY = evt.touches[0].clientY

    lastTouchX = initialX
    lastTouchY = initialY
})
document.addEventListener('touchmove', function(evt) {
    const currentTouchX = evt.touches[0].clientX
    const currentTouchY = evt.touches[0].clientY

    const movementX = currentTouchX - lastTouchX
    const movementY = currentTouchY - lastTouchY
    
    move(-movementY, -movementX)

    lastTouchX = currentTouchX
    lastTouchY = currentTouchY
})


document.addEventListener('touchend', function(evt) {
    const currentTouchX = evt.changedTouches[0].clientX
    const currentTouchY = evt.changedTouches[0].clientY

    const deltaX = Math.abs(currentTouchX - initialX)
    const deltaY = Math.abs(currentTouchY - initialY)

    //https://stackoverflow.com/questions/8825144/detect-double-tap-on-ipad-or-iphone-screen-using-javascript - Dr. Dishno
    
    if (deltaX <= threshold && deltaY <= threshold) {
        tapCount++
        tapTimer = setTimeout(function() {
            switch (tapCount) {
                case 1:
                    key("w")
                    break
                case 2:
                    key("s")
                    break
                case 3:
                    key(" ")
                    break
                case 4:
                    key("Shift")
                    break
            }
            tapCount = 0
        }, 500)
    }
})


document.addEventListener("DOMContentLoaded", function(evt) {
    setup()
})

function loop () {
    //https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    frpese(fps)
    gl.clearColor(0, 0, 0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    projector.reload()
    camera.reload()
    draw()
    requestAnimationFrame(loop)
}

function startLoop() {
    // mayb move dis?
    gl.useProgram(program)
    setTimeout(loop, 10)
}


startLoop()