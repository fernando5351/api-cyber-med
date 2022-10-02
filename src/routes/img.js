const router = require('express').Router

router.get('/', function ( req, res ) {
    const name = "https://res.cloudinary.com/dtbs1ycrd/image/upload/v1664686909/upload/subir_y1dery.png";

    res.json(name)
})