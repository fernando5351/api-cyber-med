const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
})

const db = process.env.database;

connection.connect( (err) =>{
    try {
        console.log(`conectado a la base de datos ${db}`)
    } catch (error) {
        console.log(err)
    }
})

module.exports = connection