const express = require("express")
const router = express.Router()
const {getUsers, getUser, createUser, removeUser, modifyUser, loginUser, logout} = require("../controllers/users_controller")
const { userAuthenticated, /*userIsAdministrator */} = require("../utils/common_utils")

router.post("/register", createUser)

router.get("/logout", logout)

router.post("/login", loginUser)

router.use(userAuthenticated)

router.get("/", getUsers)

router.get("/:id", getUser)

// router.use(userIsAdministrator)

router.delete("/:id", removeUser)

router.put("/:id", modifyUser)

module.exports = router