const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

//motor de plantilla
app.set('view engine', 'ejs');

//dando la direccion de archivos estaticos
app.use(express.static('public'))

//procesar datos de formularios
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//uso de las cookies
app.use(cookieParser())

//rutas
app.use(require('./routes/router'))

//inicializar server
app.listen(7000, () => {
    console.log(`servidor corriendo con exito http://localhost:7000`)
})