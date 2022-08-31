const { factory, connection } = require('../factory/quey_factory');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { promisify } = require('util');

async function register( req, res ) {
    try {
        const { nombres, apellidos, email, contrasenia } = req.body;

        console.log(nombres);
        console.log(apellidos);
        console.log(email);
        console.log(contrasenia);

        const passHash = await bcryptjs.hash(contrasenia, 8);
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
    try {
        const { email, contrasenia } = req.body

        let sql = `SELECT * FROM clientes WHERE email LIKE "%${email}"`
        console.log(sql)
        connection.query(sql, async (err, results) => {
            if (results.length == 0 || ! (await bcryptjs.compare(contrasenia, results[0].contraseña))) {
                console.log("user or password incorrect")
                res.send("user or password incorrect")
                res.render("login", {
                    alert: true,
                    title: "Usuario o Password incorrecto",
                    icon: "question",
                    showConfirmButton: true,
                    timer: 10000,
                  });
            } else {
                //inicio ok
                const id = results[0].id;
                const token = jwt.sign({ id: id }, process.env.jwt_secret, {
                    expiresIn: process.env.jwt_time_expire
                })
                console.log("token generado " + token + " para el usuario: " + email);

                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.jwt_cookie_expire * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                };
                res.cookie("jwt", token, cookiesOptions);
                console.log("hola estas logeado");
                res.redirect("http://localhost:7000/")
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function log_out ( req , res, next ) {
    if (req.cookies.jwt) {
      try {
        const decodificacion = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret);
        connection.query(`SELECT * FROM clientes WHERE id LIKE ?`, [decodificacion.id], ( err, results ) => {
            if (!results) {
                console.log("no estas logeado");
                return next()   
            }
            req.email = results[0];
            console.log("estas logeado");
            return next()
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      res.redirect('http://localhost:7000/login')
    }
  }

module.exports = {
    register,
    login,
    log_out
}