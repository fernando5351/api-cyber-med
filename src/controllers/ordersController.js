const { factory, connection } = require("../factory/quey_factory");

async function carshop(req, res) {
  const { id_producto, id_cliente, cantidad } = req.body;
  console.log(req.body);
  let query = `INSERT INTO datos_pedido(id_producto, id_cliente, cantidad, estado) VALUES (${id_producto}, ${id_cliente}, ${cantidad}, "1")`;
  const response = await factory(query);

  res.json(response);
  console.log(response);
}

async function getCarShop(req, res) {
  const { id } = req.params;

  const query = `SELECT datos_pedido.id, productos.nombre, productos.img_url, productos.precios, datos_pedido.id_producto, datos_pedido.id_cliente, clientes.nombres, datos_pedido.cantidad, datos_pedido.estado FROM clientes, datos_pedido, productos WHERE datos_pedido.id_cliente = ${id} && productos.id  = datos_pedido.id_producto && datos_pedido.id_cliente = clientes.id && datos_pedido.estado = 1;`;
  connection.query(query, async (err, results) => {
    if (results.length >= 1) {
      res.json(results);
    } else {
      res.send("0")
    }
  });
}

async function delCarShop(req, res) {
  const { id } = req.params;
  let query = `DELETE FROM datos_pedido WHERE id = ${id}`;
  query = await factory(query);

  res.json(query);
}

module.exports = {
  carshop,
  getCarShop,
  delCarShop,
};
