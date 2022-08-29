const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const connection = require("../database/db");
const { promisify } = require('util')

//procedimiento para registrar
async function register(req, res) {
  try {
    const email = req.body.email;
    const user = req.body.user;
    const password = req.body.password;
    let passHash = await bcryptjs.hash(password, 8);
    console.log(passHash)
    let sql = `INSERT INTO log(user, name, password) VALUES ("${email}", "${user}", "${passHash}")`;
    console.log(sql)
    connection.query( sql,(error, results) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/");
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.render("login", {
        alert: true,
        icon: "error",
        title: "Todos los campos son requeridos",
        showConfirmButton: true,
        timer: 10000,
        ruta: "login",
      });
    } else {
        let sql = `SELECT * FROM log WHERE user LIKE "%${email}";`;
        console.log(sql)
      connection.query(sql, async (error, results) => {
        console.log(results)
          if (results.length == 0 || !(await bcryptjs.compare(password, results[0].password))) {
            res.render("login", {
              alert: true,
              title: "Usuario y/o Password incorrectas",
              icon: "error",
              showConfirmButton: true,
              timer: 10000,
              ruta: "login",
            });
          } else {
            //inicio de sesión OK
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.jwt_secret, {
              expiresIn: process.env.jwt_time_expire,
            });
            //generamos el token SIN fecha de expiracion
            //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
            console.log("TOKEN generado: " + token + " para el USUARIO: " + email);

            const cookiesOptions = {
              expires: new Date(
                Date.now() + process.env.jwt_cookie_expire * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            res.render("login", {
              alert: true,
              title: "¡LOGIN CORRECTO!",
              icon: "success",
              showConfirmButton: false,
              timer: 800,
              ruta: "",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

async function loged (req, res, next) {
  if (req.cookies.jwt) {
    try {
      const decodificacion = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret)
      connection.query(`SELECT * FROM log WHERE id LIKE ?`, [decodificacion.id], (err, results) => {
        if (!results) {
          return next()
        }
        req.email = results[0]
        return next()
      })
    } catch (error) {
      console.log(error)
      return next()
    }
  } else {
    res.redirect('/login')
  }
}

async function logOut (req, res) {
  res.clearCookie('jwt')
  return res.redirect('/')
}

module.exports = {
  register,
  login,
  loged, 
  logOut
};
