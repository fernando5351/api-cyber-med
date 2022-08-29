const mysql = require("mysql2");

const connectionObject = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

const connection = mysql.createConnection(connectionObject, () => {
  if (err) {
    console.log(`TIENES UN ERROR EN: ${err}`);
  } else {
    console.log(`BASE DE DATOS CONECTADA`);
  }
});

module.exports = connection;
