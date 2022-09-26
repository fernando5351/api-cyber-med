const router = require ('express').Router();

const {Login,Register, logOut} = require ('../controllers/loginController')

router.post('/login/web',Login)
router.post('/register/web',Register)
router.post('/register/log?out',logOut)

module.exports=router