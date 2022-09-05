const router = require ('express').Router();

const {getTipo_consumo,posTipo_consumo,deleteTipo_cosumo,updateTipo_consumo, getTipo_consumo_id} = require ('../controllers/tipo_consumoController')

router.get('/tipo_consumo',getTipo_consumo);
router.get('/tipo_consumo/:id',getTipo_consumo_id)
router.post('/tipo_consumo',posTipo_consumo);
router.delete('/tipo_consumo/:id',deleteTipo_cosumo);
router.put('/tipo_consumo/:id',updateTipo_consumo);

module.exports = router;