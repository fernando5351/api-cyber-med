const connection = require('../../config/connection')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {promisify} = require ("util")


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
        let sql = `SELECT * FROM super_usuario WHERE user_email LIKE "%${user_email}"`;
        connection.query(sql,async(err,results)=>{
            if (results.length==0 || !(await bcryptjs.compare(user_password,results[0].user_password))) {
                res.send('mete bien las cosas amiguito')
            }else{
                const id = results[0].id;
                const token = jwt.sign({id:id},process.env.jwt_secret,{
                    expiresIn: process.env.jwt_time_expire
                })
                console.log(`token generado ${token} por el usuario ${results}[0].user`);
                console.log(sql);

                const cookieoptions = {
                    expires: new Date(Date.now()+ process.env.jwt_cookie_expire *24 *60 * 1000),
                    httpOnly: true
                }
                res.cookie("JWT". token, cookieoptions)
                console.log('estas logueado amigo');
                res.redirect('http://localhost:3000/home')
                
            }
        })
    } catch (error) {   
        console.log(`Tiene un error amigo`)
    }
}

module.exports = {
    Login,
    Register
}