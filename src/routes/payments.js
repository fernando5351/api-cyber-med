const router = require("express").Router()
const { pay } = require("../controllers/paymentsController")

router.post("/payment", pay);
// router.post("/payments", payment);
// router.post("/stripe", stripePay);

module.exports = router