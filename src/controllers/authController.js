const { factory, connection } = require('../factory/quey_factory');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

async function register( req, res ) {
    try {
        const { nombres, apellidos, email, contraseña } = req.body;
        const passHash = await bcryptjs.hash(contraseña, 8);
        console.log(passHash)
        const sql = `INSERT INTO clientes(nombres, apellidos, email, contraseña) VALUES ("${nombres}", "${apellidos}", "${email}", "${passHash}");`;
        console.log(sql)
        const query = await factory(sql);

        res.json(query);
    } catch (error) {
        console.log(error)
    }
}

async function login (req, res) {
    
}

module.exports = {
    register,
    login
}