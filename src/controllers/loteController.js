const {factory,connection} = require('../factory/quey_factory');

async function getLote (req,res){
    let query = 'SELECT lote.id, lote.fecha_ingreso, lote.fecha_vencimiento, lote.detalle_producto, lote.cantidad, lote.precio_producto, lote.activo, empresa.nombre_empresa FROM lote,empresa WHERE lote.id_empresa=empresa.id;'
    const getLote = await factory(query);
    console.log(query)

    const object = getLote;
    res.json(object)
    console.log(object)
};

async function postLote (req,res) {
    const {body} = req;
    let query = `INSERT INTO lote (fecha_ingreso,fecha_vencimiento,detalle_producto,cantidad,precio_producto,id_empresa,activo) VALUES (${connection.escape(body.fecha_ingreso)},${connection.escape(body.fecha_vencimiento)},${connection.escape(body.detalle_producto)},${connection.escape(body.cantidad)},${connection.escape(body.precio_producto)},${connection.escape(body.id_empresa)},${connection.escape(body.activo)})`;
    const response = await factory(query);
    console.log(query);
    res.json({response});
}

async function deleteLote (req,res) {
    const {id} = req.params;
    let query = `DELETE FROM lote WHERE id=${id}`;
    const response = await factory(query);
    res.json({response});
}

async function updateLote (req,res) {
     const {fecha_ingreso,fecha_vencimiento,detalle_producto,cantidad,precio_producto,id_empresa,activo} = req.body;
     const {id} = req.params;
     let query = `UPDATE lote SET id=${id}, fecha_ingreso="${fecha_ingreso}", fecha_vencimiento="${fecha_vencimiento}", detalle_producto="${detalle_producto}", cantidad="${cantidad}", precio_producto="${precio_producto}", id_empresa="${id_empresa}", activo="${activo}" WHERE id LIKE ${id};`
     const response = await factory(query);
     console.log(query);
     res.json({response});
}

module.exports ={
    getLote,
    postLote,
    deleteLote,
    updateLote
}