const connection = require("../../config/connection");
var express = require("express");
const cors = require("cors");
var router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { promisify } = require("util");
const app = express();
const localhost = "http://localhost:3000/home";
const railway = "https://cyber-med.vercel.app/home"

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", session: req.session });
});

async function Register(req, res) {
  try {
    const { user_email, user_password } = req.body;
    const passhash = await bcryptjs.hash(user_password, 8);
    const sql = `INSERT INTO super_usuario(user_email,user_password) VALUE ("${user_email}", "${passhash}")`;

    connection.query(sql, (err, rows) => {
      if (err) {
      } else {
        res.send(`usuario registrado con exito`);
      }
    });
  } catch (error) {
    console.log(`there was an error in: ${error}`);
  }
}

async function Login(req, res) {
  try {
    const { user_email, user_password } = req.body;
    let sql = `SELECT * FROM super_usuario WHERE user_email LIKE "%${user_email}"`;
    connection.query(sql, async (err, results) => {
      if (
        results.length == 0 ||
        !(await bcryptjs.compare(user_password, results[0].user_password))
      ) {
        res.send("mete bien las cosas amiguito");
      } else {
        const id = results[0].id;
        const token = jwt.sign({ id: id }, process.env.jwt_secret, {
          expiresIn: process.env.jwt_time_expire,
        });
        const cookiesOptions = {
          expires: new Date(
            Date.now() + process.env.jwt_cookie_expire * 24 * 60 * 1000
          ),
          httpOnly: true,
        };
        res.cookie("JWT", token, cookiesOptions);
        res.redirect(railway);
      }
    });
  } catch (error) {
    console.log(`there was an error in: ${error}`);
  }
}

async function logOut(req, res, next) {
  if (req.cookies.jwt) {
    try {
      const decodificacion = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.jwt_secret
      );
      connection.query(
        `SELECT * FROM super_usuario WHERE id LIKE ?`,
        [decodificacion.id],
        (err, results) => {
          if (!results) {
            res.redirect("http://localhost:3000");
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
    res.redirect("http://localhost:3000");
  }
}

module.exports = {
  Login,
  Register,
  logOut,
};
