const router = require("express").Router()
const { payment } = require("../controllers/paymentsController")

router.post("/payments", payment);

module.exports = router