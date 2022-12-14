const router = require('express').Router();

const UserController = require('../controller/UserController')

const verify = require('../helpers/check-token');

//Rota 
router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/checkuser", UserController.checkUser)
router.get("/:id", UserController.getUserById)

module.exports = router;