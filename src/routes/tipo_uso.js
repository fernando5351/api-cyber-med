const router = require ('express').Router();

const { getTipo_uso }=require('../controllers/tipo_usoController');
const {postTipo_uso} = require ('../controllers/tipo_usoController');
const {updateTipo_uso}= require('../controllers/tipo_usoController');
const {deleteTipo_uso} = require ('../controllers/tipo_usoController.js');


router.get ('/tipo_uso',getTipo_uso);
router.post('/tipo_uso',postTipo_uso);
router.put ('/tipo_uso/:id',updateTipo_uso);
router.delete('/tipo_uso/:id',deleteTipo_uso);
module.exports = router;