const { factory } = require("../factory/quey_factory");
const connection = require("../../config/connection");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

async function register(req, res) {
  try {
    const { nombres, apellidos, email, contrasenia } = req.body;

    let sql = `SELECT email FROM clientes WHERE email = "${email}"`;
    connection.query(sql, async (err, results) => {
      if (results.length == 0) {
        const passHash = await bcryptjs.hash(contrasenia, 8);
        const sql = `INSERT INTO clientes(nombres, apellidos, email, contraseña) VALUES ("${nombres}", "${apellidos}", "${email}", "${passHash}");`;
        const query = await factory(sql);

        res.json({
          id: `${query.insertId}`,
          nombres: `${nombres}`,
          apellidos: `${apellidos}`,
          email: `${email}`,
        });
      } else {
        res.status(200).send("El usuario ya esta registrado");
      }
    });
  } catch (error) {}
}

async function login(req, res) {
  try {
    const { email, contrasenia } = req.body;

    let sql = `SELECT * FROM clientes WHERE email LIKE "%${email}"`;
    connection.query(sql, async (err, results) => {
      if (results.length === 0) {
        res.send("No se encontro ningún usuario con el correo espedificado");
      }
      if (
        results.length >= 1 &&
        (await bcryptjs.compare(contrasenia, results[0].contraseña)) !== true
      ) {
        res.send("Contraseña incorrecta");
      }
      if (
        results.length >= 1 &&
        (await bcryptjs.compare(contrasenia, results[0].contraseña)) === true
      ) {
        //inicio ok
        const id = results[0].id;
        const token = jwt.sign({ id: id }, process.env.jwt_secret, {
          expiresIn: process.env.jwt_time_expire,
        });

        const cookiesOptions = {
          expires: new Date(
            Date.now() + process.env.jwt_cookie_expire * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        res.cookie("jwt", token, cookiesOptions);
        res.json({
          id: `${results[0].id}`,
          nombres: `${results[0].nombres}`,
          apellidos: `${results[0].apellidos}`,
          email: `${results[0].email}`,
        });
      }
    });
  } catch (error) {
    console.log(`there was an error in: ${error}`);
  }
}

async function log_out(req, res, next) {
  if (req.cookies.jwt) {
    try {
      const decodificacion = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.jwt_secret
      );
      connection.query(
        `SELECT * FROM clientes WHERE id LIKE ?`,
        [decodificacion.id],
        (err, results) => {
          if (!results) {
            return next();
          }
          req.email = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(`there was an error in: ${error}`);
    }
  } else {
    res.send("user log out");
  }
}

async function deleteUser(req, res) {
  const { id } = req.body;

  let sql = `delete clientes WHERE id = ${id}`;

  const query = await factory(sql);
  res.json(query);
}

async function putUser(req, res) {}

module.exports = {
  register,
  login,
  log_out,
  deleteUser,
  putUser,
};
