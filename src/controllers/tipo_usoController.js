const {factory,connection} = require ('../factory/quey_factory.js');
const por = require ('../app');


async function getTipo_uso (req,res){
    let query = 'SELECT * FROM tipo_medicamento';
    const response = await factory(query);
    res.json(response);
}

async function postTipo_uso (req,res){
    const { tipo_uso, estado} = req.body;
    let query = `INSERT INTO tipo_medicamento (tipo_uso, estado) VALUES ("${tipo_uso}", ${estado})`;
    const response = await factory(query);
    res.json({response});
}

async function updateTipo_uso (req,res){
    const {tipo_uso} = req.body;
    const {id} = req.params;
    let query = `UPDATE tipo_medicamento SET id=${id},tipo_uso ="${tipo_uso}" WHERE id LIKE ${id}`;
    const response = await factory(query); 
    res.json({response});
} 

async function deleteTipo_uso (req,res){
    const {id} = req.params;
    let query = `DELETE FROM tipo_medicamento WHERE id=${id}`;
    const response = await factory(query);
    res.json({response});
}1

module.exports = {
    getTipo_uso,
    postTipo_uso,
    updateTipo_uso,
    deleteTipo_uso
}