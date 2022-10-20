const { factory } = require("../factory/quey_factory");

async function carshop(req, res) {
  const { id_producto, id_cliente, cantidad, estado } = req.body;
  console.log(req.body);
  let query = `INSERT INTO datos_pedido(id_producto, id_cliente, cantidad, estado) VALUES (${id_producto}, ${id_cliente}, ${cantidad}, (1))`;
  const response = await factory(query);

  res.json(response);
  console.log(response);
}

async function getCarShop(req, res) {
  const { id } = req.params;

  let validation = `SELECT estado FROM datos_pedido WHERE id_cliente = ${id}`;
  let sql = await factory(validation);
  console.log(sql);
  console.log(validation);

  if (sql[0].estado === 1) {
    const query = `SELECT productos.nombre, productos.precios, datos_pedido.id_producto, datos_pedido.id_cliente, clientes.nombres, datos_pedido.cantidad, datos_pedido.estado FROM clientes, datos_pedido, productos WHERE datos_pedido.id_cliente = ${id} && productos.id  = datos_pedido.id_producto && datos_pedido.id_cliente = clientes.id;`;
    const response = await factory(query);
    console.log(query);

    console.log(id);
    res.json(response);
  } else {
    res.json({message: "no hay ningun producto en cuestion"})
  }
}

module.exports = {
  carshop,
  getCarShop,
};
