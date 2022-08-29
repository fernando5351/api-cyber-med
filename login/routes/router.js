const router = require('express').Router();

const { register, login, loged, logOut } = require('../controllers/authController')

//vistas
router.get('/', loged, (req, res ) => {
    res.render('index')
})

router.get('/login', (req, res ) => {
    res.render('login', { alert: false})
})

router.get('/register', (req, res ) => {
    res.render('register')
})

//endpoints
router.post('/registers' , register);
router.post('/login', login);
router.get('/logout', logOut);

module.exports = router