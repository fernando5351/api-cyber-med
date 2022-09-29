const router = require ('express').Router();
const cors = require('cors')

const {Login,Register, logOut} = require ('../controllers/loginController')

router.post('/login/web',Login)
router.post('/register/web',Register)
router.post('/register/log_out',logOut)



module.exports=router