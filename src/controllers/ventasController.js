const { factory } = require("../factory/quey_factory");
const qrcode = require("qrcode");
const fs = require("fs");

const generator = async (req, res) => {
  const query =
    "SELECT productos.nombre, datos_pedido.cantidad FROM productos, datos_pedido WHERE datos_pedido.id_producto LIKE productos.id;";

  let sql = await factory(query);

  const QR = await qrcode.toDataURL(sql);

  res.json(QR);

  console.log(QR)
  console.log(sql)
};

module.exports = {
  generator,
};
