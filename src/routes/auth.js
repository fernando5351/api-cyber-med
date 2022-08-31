const router = require('express').Router();

const { register, login, log_out } = require('../controllers/authController');

router.post('/register', register );
router.post('/login', login );
router.get('/log_out', log_out);

module.exports = router;