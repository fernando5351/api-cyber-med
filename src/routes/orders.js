const router = require('express').Router();
const { carshop, getCarShop } = require("../controllers/ordersController")

router.post("/car_shop", carshop);
router.get("/car_shop/:id", getCarShop)

module.exports = router