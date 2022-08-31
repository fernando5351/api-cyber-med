const { factory } = require("../factory/quey_factory");
const qrcode = require("qrcode");

const generator = async (req, res) => {
  const { id } = req.params
  const query =
    `SELECT productos.nombre, datos_pedido.cantidad FROM productos, datos_pedido WHERE id LIKE ${id} && datos_pedido.id_producto LIKE productos.id;`;

  let sql = await factory(query)

  let stringData = JSON.stringify(sql);

  const QR = await qrcode.toDataURL(stringData);

  res.json(QR);

  console.log(QR);
  console.log(sql);
};

module.exports = {
  generator,
};
