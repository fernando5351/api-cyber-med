const connection = require('../../config/connection')
var express = require('express');
const cors = require('cors')
var router = express.Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {promisify} = require ("util")
const app = express();
const whitelist= ['http://localhost:3000/home']
app.use(cors({ whitelist }))


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', session: req.session });
  });


async function Register (req,res){
    try {
        const {user_email,user_password}= req.body
        const passhash = await bcryptjs.hash(user_password,8)
        const sql = `INSERT INTO super_usuario(user_email,user_password) VALUE ("${user_email}", "${passhash}")`

        connection.query(sql,(err,rows)=>{
            if (err) {
                console.log(`tienes un error en ${err}`)
            }else{
                res.send(`usuario registrado con exito`)
            }
        })
    } catch (error) {
        console.log(`error amiguito`)
    }
}

async function Login (req,res){
    try {
        const {user_email,user_password} = req.body;
        const data = (req.body);
        console.log(data);
        let sql = `SELECT * FROM super_usuario WHERE user_email LIKE "%${user_email}"`;
        console.log(sql);
        connection.query(sql,async(err,results)=>{
            if (results.length==0 || !(await bcryptjs.compare(user_password,results[0].user_password))) {
                res.send('mete bien las cosas amiguito')
            }else{
                const id = results[0].id;
                const token = jwt.sign({id:id},process.env.jwt_secret,{
                    expiresIn: process.env.jwt_time_expire
                })
                //console.log(`token generado ${token} por el usuario ${results[0].user_email}`);
                console.log(sql);

                const cookiesOptions = {
                    expires: new Date(Date.now()+ process.env.jwt_cookie_expire *24 *60 * 1000),
                    httpOnly: true
                }
                res.cookie("jwt", token, cookiesOptions);
                console.log('estas logueado amigo');
                //res.send("user loged")
                res.redirect('http://localhost:3000/home');
            }
        })
    } catch (error) {   
        console.log(`Tiene un error amigo`)
    }
}

async function logOut(req, res, next) {
    if (req.cookies.jwt) {
      try {
        const decodificacion = await promisify(jwt.verify)(req.cookies.jwt, process.env.jwt_secret);
        connection.query(`SELECT * FROM super_usuario WHERE id LIKE ?`, [decodificacion.id],(err, results) => {
            if (!results) {
              console.log("no estas logeado");
              res.redirect("http://localhost:3000")
              return next();
            }
            req.email = results[0];
            console.log("estas logeado");
            return next();
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send("user log out");
      res.redirect("http://localhost:3000")
    }
  }

module.exports = {
    Login,
    Register,
    logOut
}