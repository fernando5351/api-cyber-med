const router = require("express").Router();

const { getGallery } = require("../controllers/galleryController")

router.get('/gallery', getGallery)


module.exports = router;