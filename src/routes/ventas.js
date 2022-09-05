const router = require("express").Router();

const { generator } = require("../controllers/ventasController")

router.get('/qr/:id', generator);

module.exports = router