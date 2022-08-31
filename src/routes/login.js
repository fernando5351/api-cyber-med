const router = require ('express').Router();

const {Login,Register} = require ('../controllers/loginController')

router.post('/Login/web',Login)
router.post('/Register/web',Register)

module.exports=router