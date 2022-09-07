const {factory,connection} = require('../factory/quey_factory');

async function getTipo_consumo (req,res){
    let query = 'SELECT * FROM tipo_consumo';
    const getTipo_consumo = await factory(query);

    const object = getTipo_consumo
    res.json(object);
    console.log(object);
}

async function getTipo_consumo_id (req,res){
    const {id} = req.params;
    console.log(id);
    let query = `SELECT productos.id , productos.nombre , productos.descripcion, tipo_medicamento.tipo_uso, productos.cantidad_medicamento, tipo_consumo.tipo_consumo, productos.cant_gramos, productos.marca, productos.precios, productos.img_url FROM productos , tipo_medicamento, tipo_consumo WHERE productos.id_tipo_uso = tipo_medicamento.id && productos.id_tipo_consumo = tipo_consumo.id && id_tipo_consumo = ${id}`;
    const response = await factory(query);
    const object = response;
    res.json(object);
}

async function posTipo_consumo (req,res){
    const { tipo_consumo, estado } = req.body;
    let query = `INSERT INTO tipo_consumo (tipo_consumo, estado) VALUES ("${tipo_consumo}", ${estado})`;
    const response = await factory(query);
    console.log(query);
    res.json({response});
}


async function deleteTipo_cosumo(req,res){
    const {id} = req.params;
    let query = `DELETE  FROM tipo_consumo WHERE id=${id}`;
    const response = await factory(query);
    console.log(query);
    res.json({response});
}

async function updateTipo_consumo(req,res){
    const {id} = req.params;
    const  {tipo_consumo, estado} = req.body;
    let query = `UPDATE tipo_consumo SET estado=${estado}, tipo_consumo="${tipo_consumo}" WHERE id=${id}`;
    const response = await factory(query);
    console.log(query);
    res.json({response});
}
module.exports = {
    getTipo_consumo,
    posTipo_consumo,
    deleteTipo_cosumo,
    updateTipo_consumo,
    getTipo_consumo_id
}

