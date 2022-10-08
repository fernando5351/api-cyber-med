const route = require('express').Router()

route.get('/hola',function (req,res)  {
    res.send('hola que hace')
})

 

module.exports = route;