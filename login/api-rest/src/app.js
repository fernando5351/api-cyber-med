const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 9000

//initialization
const app = express()

//settings
app.set('port', port)

//middlewares
app.use(cors())

//routes
app.use(require("../src/router/gallery"))

module.exports = app