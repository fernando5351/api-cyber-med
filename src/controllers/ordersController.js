const { factory } = require("../factory/quey_factory");

async function carshop(req, res) {
  const { id_producto, id_cliente, cantidad } = req.body;
  let query = `INSERT INTO datos_pedido(id_producto, id_cliente, cantidad) VALUES (${id_producto}, ${id_cliente}, ${cantidad})`;
  const response = await factory(query);

  res.json(response);
}

async function getCarShop(req, res) {
  const { id } = req.params;

  let validation = `SELECT estado FROM datos_pedido WHERE id_cliente = ${id}`;
  validation = await factory(validation);
  console.log(validation[0].estado);

  if (validation[0].estado === 1) {
    const query = `SELECT productos.nombre, datos_pedido.id_producto, datos_pedido.id_cliente, clientes.nombres, datos_pedido.cantidad, datos_pedido.estado FROM clientes, datos_pedido, productos WHERE datos_pedido.id_cliente = ${id} && productos.id  = datos_pedido.id_producto && datos_pedido.id_cliente = clientes.id;`;
    const response = await factory(query);

    console.log(id);
    res.json(response);
  } else {
    res.send("hola")
  }
}

module.exports = {
  carshop,
  getCarShop,
};