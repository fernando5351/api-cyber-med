const router = require('express').Router();
const { carshop, getCarShop, delCarShop } = require("../controllers/ordersController")

router.post("/car_shop", carshop);
router.get("/car_shop/:id", getCarShop)
router.delete("/car_shop/:id", delCarShop)

module.exports = router