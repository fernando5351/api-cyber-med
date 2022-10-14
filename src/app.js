const express = require("express");
const port = process.env.PORT || 4000;
const multer = require("multer");
const bodyParser = require('body-parser');
const { urlencoded, json } = require("express");
const path = require("path");
const cors = require("cors");
const storage = require("../config/multer");
const cookieParser = require("cookie-parser");

// initialization
const app = express();
const whitelist = ['http://localhost:3000/home']

//settings
app.set("port", port);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//middlewares
app.use ( function ( req , res , next ) {
  res.header ( 'Access-Control-Allow-Origin' , "*" ) ;
  res.header ( 'Access-Control-Allow-Methods' , 'GET, PUT, POST, DELETE');
  res.header ( 'Access-Control-Allow-Headers' , "Origin, X-Requested-With, Content-Type, Accept");
  next();
});                                 
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(multer({ storage }).single("file"));
app.use(cookieParser());

//route
app.use(require("./routes/img"));
app.use(require("./routes/productos"));
app.use(require("./routes/empresa"));
app.use(require("./routes/tipo_uso"));
app.use(require("./routes/tipo_consumo"));
app.use(require("./routes/ventas"));
app.use(require("./routes/auth"));
app.use(require("./routes/login"));
app.use(require("./routes/payments"))
app.use(require("./routes/lote"));

//public files
app.use(express.static(path.join(__dirname, "../public")));

module.exports = app;
