const { factory, connection } = require("../factory/quey_factory");
const path = require("path");
const fs = require("fs");
let cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_key_secret
});

async function getProduct(req, res) {
  const { id } = req.params;

  let query = `SELECT productos.id, productos.descripcion, productos.img_url, productos.nombre, productos.precios, productos.marca, productos.cant_gramos, productos.id_tipo_consumo, productos.id_tipo_uso, tipo_medicamento.tipo_uso, tipo_consumo.tipo_consumo, productos.cantidad_medicamento FROM productos, tipo_medicamento, tipo_consumo WHERE productos.id = ${id} && productos.id_tipo_uso LIKE tipo_medicamento.id && productos.id_tipo_consumo LIKE tipo_consumo.id;`;
  const getProducts = await factory(query);

  res.json(getProducts);
}

async function getProducts(req, res) {

  let query = `SELECT productos.id, productos.descripcion, productos.img_url, productos.nombre, productos.precios, productos.marca, productos.cant_gramos, productos.id_tipo_consumo, productos.id_tipo_uso, tipo_medicamento.tipo_uso, tipo_consumo.tipo_consumo, productos.cantidad_medicamento FROM productos, tipo_medicamento, tipo_consumo WHERE productos.id_tipo_uso LIKE tipo_medicamento.id &&  productos.id_tipo_consumo LIKE tipo_consumo.id;`;
  const getProduct = await factory(query);

  const object = getProduct
  res.json(object);
}


async function products_uso ( req, res) {
  const { id } = req.params
  let sql = `SELECT productos.id , productos.nombre , productos.descripcion, tipo_medicamento.tipo_uso, productos.cantidad_medicamento, tipo_consumo.tipo_consumo, productos.cant_gramos, productos.marca, productos.precios, productos.img_url FROM productos , tipo_medicamento, tipo_consumo WHERE productos.id_tipo_uso = tipo_medicamento.id && productos.id_tipo_consumo = tipo_consumo.id && id_tipo_uso = ${id}`;
  const query = await factory(sql);

  const object = query;
  res.json(object);
}

async function products_consumo (req,res){
  const {id} = req.params;
  let query = `SELECT productos.id , productos.nombre , productos.descripcion, tipo_medicamento.tipo_uso, productos.cantidad_medicamento, tipo_consumo.tipo_consumo, productos.cant_gramos, productos.marca, productos.precios, productos.img_url FROM productos , tipo_medicamento, tipo_consumo WHERE productos.id_tipo_uso = tipo_medicamento.id && productos.id_tipo_consumo = tipo_consumo.id && id_tipo_consumo = ${id}`;
  const response = await factory(query);
  const object = response;
  res.json(object);
}

async function postProduct (req, res) {
  const { descripcion, id_tipo_consumo, id_tipo_uso, cantidad_medicamento, nombre, precios, marca, cant_gramos } = req.body

  //subiendo imagenes a cloudinary
  const response = cloudinary.v2.uploader.upload(req.file.path)
  //obtener la direccion y el id de la imagen en cloudinary
  let route = (await response).url;
  let name_img = (await response).public_id;
  let query = `INSERT INTO productos(img_url, name_img, descripcion, id_tipo_uso, id_tipo_consumo, cantidad_medicamento,nombre, precios, marca, cant_gramos) VALUES (${connection.escape(route)}, "${name_img}", "${descripcion}", ${id_tipo_uso}, ${id_tipo_consumo}, ${cantidad_medicamento},"${nombre}", "${precios}","${marca}","${cant_gramos}")`;
  const postData = await factory(query);

  res.json({postData});

  //obtener el nombre de la imagen para removerla del server
  const img = req.file.filename;

  //ruta donde se hubica la imagen
  let router = path.join(__dirname, `../../public/images/${img}`);

  //eliminamos la imagen por el metodo file system                                                                                                                        
  try {
    await fs.unlinkSync(router);                                                                                                
    //file removed
  } catch (err) {
    console.log(`there was an error in: ${error}`);
  }
}

async function putProducts ( req, res ) {
  const { id } = req.params;
  const { descripcion, id_tipo_consumo, id_tipo_uso, cantidad_medicamento, nombre, precios, marca, cant_gramos, id_lote } = req.body

  //obtener el nombre de la imagen para luego borrarla de cloudinary
  let sql = `SELECT name_img FROM productos WHERE id LIKE ${id}`
  const data = await factory(sql);

  const dataRes = data

  const name_image = dataRes[0].name_img
  
  //subiendo imagenes a cloudinary
  const response = cloudinary.v2.uploader.upload(req.file.path);
  //obtener la direccion y el id de la imagen en cloudinary
  let route = (await response).url;
  let name_img = (await response).public_id;
  let query = `UPDATE productos SET nombre="${nombre}", descripcion="${descripcion}", id_tipo_uso="${id_tipo_uso}", id_tipo_consumo="${id_tipo_consumo}", cant_gramos="${cant_gramos}", marca="${marca}", precios="${precios}", id_lote="${id_lote}", img_url="${route}", cantidad_medicamento="${cantidad_medicamento}", name_img="${name_img}" WHERE id LIKE ${id}`;
  const getdata = await factory(query);

  res.json(getdata)

  const del = await cloudinary.v2.uploader.destroy(name_image);

  //obtener el nombre de la imagen para removerla del server
  const img = req.file.filename;

  //ruta donde se hubica la imagen
  let router = path.join(__dirname, `../../public/images/${img}`);

  //eliminamos la imagen por el metodo file system                                                                                                                        
  try {
    await fs.unlinkSync(router);                                                                                                
    //file removed
  } catch (err) {
    console.error(err);
  }
}

async function delProducts(req, res) {
  const { id } = req.params;

  //obtener el nombre de la imagen
  let getData = `SELECT name_img FROM productos WHERE id LIKE ${id}`;
  const data = await factory(getData);

  const dataRes = data

  //eliminamos el registro
  let sql = `DELETE FROM productos WHERE id LIKE ${id}`;
  const response = await factory(sql)

  res.json(response)

  const name_img = dataRes[0].name_img
  await cloudinary.uploader.destroy(name_img)

}


module.exports = {
  getProduct,
  products_uso,
  products_consumo,
  getProducts,
  postProduct,
  putProducts,
  delProducts
 };