const router = require ('express').Router()

const {getLote,postLote,deleteLote,updateLote} =require('../controllers/loteController')

router.get('/lote',getLote);
router.post('/lote',postLote);
router.delete('/lote/:id',deleteLote);
router.put('/lote/:id',updateLote);



module.exports = router;