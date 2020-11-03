const express = require('express');
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');
const {authentication} = require('../middlewares/security');

router.post("/", authentication, CategoryController.addCategory)

module.exports = router