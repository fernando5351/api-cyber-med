const qrcode = require("qrcode");
const fs = require("fs");

const generator = async (req, res) => {
  
  let sql = [
    {
      "nombre": "intestonomicina",
      "cantidad": 5
    }
  ];

  let stringData = JSON.stringify(sql)

  qrcode.toString(stringData,{type:'terminal'}, function (err, url) {
    if(err) return console.log("error occured")
    console.log(url)
  })


  console.log(QR)
  console.log(sql)
};