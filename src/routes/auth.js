const router = require('express').Router();

const { register, login, log_out, deleteUser } = require('../controllers/authController');

router.post('/register', register );
router.post('/login', login );
router.get('/log_out', log_out);
router.delete('/user/app/delete/:id', deleteUser );

module.exports = router;