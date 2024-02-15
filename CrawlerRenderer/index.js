let express = require('express')
// allows for module system
let cors = require("cors")
let exp = express()
exp.use(cors())
// setup the server / provide the folder "web"
exp.use(express.static('web'))
let web = exp.listen(3000, function() {
  console.log("Running")
})
