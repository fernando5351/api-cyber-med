const router = require("express").Router()
const { payment, stripePay } = require("../controllers/paymentsController")

router.post("/payments", payment);
router.post("/stripe", stripePay);

module.exports = router