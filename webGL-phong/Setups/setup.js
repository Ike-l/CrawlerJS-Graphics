const canvas = document.getElementById("surface")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

canvas.hidden = false
 canvas.addEventListener("click", function() {
  if (document.pointerLockElement != canvas) {
    canvas.requestPointerLock()
  }
})
    const gl = canvas.getContext("webgl")
    if (!gl) {
        alert("Your browser does not support webgl")
    }


    gl.clearColor(0.75, 0.85, 0.8, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
/*
This go in webGL ^
*/
    export { gl, canvas }
    
