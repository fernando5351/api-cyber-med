const router = require('express').Router();

const { register, login } = require('../controllers/authController');

router.post('/login', register );
router.post('/login', login );

module.exports = router;