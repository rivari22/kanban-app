const express = require('express');
const router = express.Router()
const Controller = require('../controllers/Controller');
const taskRoutes = require('./task');
const categoryRouter = require('./category');

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/googleLogin", Controller.googleLogin)

router.use("/tasks", taskRoutes)
router.use("/category", categoryRouter)

module.exports = router