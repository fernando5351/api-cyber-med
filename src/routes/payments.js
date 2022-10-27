const router = require("express").Router()
const { payments } = require("../controllers/paymentsController")

router.post("/payment", payments);
// router.post("/payments", payment);
// router.post("/stripe", stripePay);

module.exports = router