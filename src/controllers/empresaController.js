
const {factory,connection} = require ('../factory/quey_factory');

async function getEmpresa (req,res){
    let query = 'SELECT  empresa.id, empresa.nombre_empresa, empresa.direccion, empresa.email,empresa.telefono, empresa.lote,empresa.activo, productos.nombre FROM empresa,productos WHERE productos.id=empresa.id_producto;';
    const getEmpresa = await factory(query);
    console.log(query)

    const object = getEmpresa
    res.json(object);
    console.log(object);
}

async function postEmpresa(req,res){
    const { body } = req;
    let query = `INSERT INTO empresa (nombre_empresa, id_producto, direccion, telefono, email, lote, activo) VALUES (${connection.escape(body.nombre_empresa)},${connection.escape(body.id_producto)},${connection.escape(body.direccion)},${connection.escape(body.telefono)},${connection.escape(body.email)},${connection.escape(body.lote)},${connection.escape(body.activo)})`;
    const response = await factory(query);
    console.log(query)
    res.json({response});
}

async function deleteEmpresa(req, res){
    const {id} = req.params;
    let query = `DELETE FROM empresa WHERE id=${id}`;
    const response = await factory(query);
    res.json({response});
}

async function updateEmpresa(req,res){
    const {nombre_empresa,id_producto,direccion,telefono,email,lote,activo} = req.body;
    const {id} = req.params;
    let query = `UPDATE empresa SET id=${id} , nombre_empresa="${nombre_empresa}", id_producto=${id_producto} , direccion="${direccion}" , telefono="${telefono}" , email="${email}" , lote=${lote} , activo=${activo} WHERE id LIKE ${id};`;
    const response = await factory(query);
    console.log(query);
    res.json({response});
}



module.exports = {
    getEmpresa, 
    postEmpresa,
    deleteEmpresa,
    updateEmpresa
}