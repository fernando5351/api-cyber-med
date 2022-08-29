const router = require("express").Router();

const { generator } = require("../controllers/ventasController")

router.get('/qr', generator);

module.exports = router