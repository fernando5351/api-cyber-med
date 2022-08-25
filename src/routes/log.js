const router = require('express').Router()

const { login } = require("../controllers/logController");

router.get('/log', login);

module.exports = router