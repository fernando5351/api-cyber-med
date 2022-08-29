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
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(multer({storage}).single('file'))
app.use(json());
app.use(cookieParser())

//routes
app.use(require('./routes/productos'));
app.use(require('./routes/empresa'));
app.use(require('./routes/tipo_uso'));
app.use(require('./routes/tags'));
app.use(require('./routes/tipo_consumo'));
app.use(require('./routes/ventas'));
app.use(require('./routes/auth'));
app.use(require('./routes/login'));


//public files
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app