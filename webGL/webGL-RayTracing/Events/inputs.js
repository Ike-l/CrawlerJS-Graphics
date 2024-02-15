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