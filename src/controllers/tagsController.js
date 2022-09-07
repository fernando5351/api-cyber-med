const { factory } = require("../factory/quey_factory");

async function getTags(req, res) {
  let quey = `SELECT * FROM tipo_consumo`;
  const getTags = await factory(quey);

  const object = getTags
  res.json(object);
  console.log(object);
}

async function filter ( req, res) {
  const { id } = req.params

  //SELECT productos.id , productos.nombre , productos.descripcion, tipo_medicamento.tipo_uso, productos.cantidad_medicamento, tipo_consumo.tipo_consumo, productos.cant_gramos, productos.marca, productos.precios, productos.img_url FROM productos , tipo_medicamento, tipo_consumo WHERE productos.id_tipo_uso = tipo_medicamento.id && productos.id_tipo_consumo = tipo_consumo.id && id_tipo_uso =

  let sql = `SELECT productos.id , productos.nombre , productos.descripcion, tipo_medicamento.tipo_uso, productos.cantidad_medicamento, tipo_consumo.tipo_consumo, productos.cant_gramos, productos.marca, productos.precios, productos.img_url FROM productos , tipo_medicamento, tipo_consumo WHERE productos.id_tipo_uso = tipo_medicamento.id && productos.id_tipo_consumo = tipo_consumo.id && id_tipo_uso = ${id}`;
  const query = await factory(sql);

  res.json(query)
}

module.exports = {
  getTags,
  filter
};
