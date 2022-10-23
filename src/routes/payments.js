const router = require("express").Router()
const { payment, stripe } = require("../controllers/paymentsController")

router.post("/payments", payment);
router.post("/stripe", stripe);

module.exports = router