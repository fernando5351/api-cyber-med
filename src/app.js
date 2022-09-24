const express = require("express");
const port = process.env.PORT || 4000;
const multer = require('multer')
const { urlencoded, json } = require("express");
const path = require("path");
const cors = require("cors");
const storage = require('../config/multer')
const cookieParser = require('cookie-parser')

// initialization
const app = express();

//settings
app.set('port', port);

//middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(multer({storage}).single('file'))
app.use(json());
app.use(cookieParser())

//routes
app.use(require('./routes/productos'));
app.use(require('./routes/empresa'));
app.use(require('./routes/tipo_uso'));
app.use(require('./routes/tipo_consumo'));
app.use(require('./routes/ventas'));
app.use(require('./routes/auth'));
app.use(require('./routes/login'));


//public files
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app