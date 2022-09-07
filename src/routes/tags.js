const express = require('express');
const router = express.Router();

const { getTags, filter } = require('../controllers/tagsController')

router.get('/view/tags-products', getTags);
router.get('/filter/:id', filter)

module.exports = router