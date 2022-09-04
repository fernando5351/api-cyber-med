const router = require('express').Router();

const { register, login, log_out, deleteUser, putUser } = require('../controllers/authController');

router.post('/register', register );
router.post('/login', login );
router.put('/user/app/:id', putUser)
router.get('/log_out', log_out);
router.delete('/user/app/:id', deleteUser );

module.exports = router;