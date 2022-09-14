const router = require('express').Router();


const {getEmpresa, postEmpresa, deleteEmpresa, updateEmpresa} = require ('../controllers/empresaController');



router.get('/empresa',getEmpresa);
router.post('/empresa',postEmpresa);
router.delete('/empresa/:id',deleteEmpresa);
router.put('/empresa/:id',updateEmpresa);

module.exports = router;