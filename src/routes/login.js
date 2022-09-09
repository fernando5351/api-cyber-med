const router = require ('express').Router();

const {Login,Register} = require ('../controllers/loginController')

router.post('/login/web',Login)
router.post('/register/web',Register)

module.exports=router