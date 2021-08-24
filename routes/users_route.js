const express = require("express")
const router = express.Router()
const {getUsers, getUser, createUser, removeUser, modifyUser, loginUser, logout} = require("../controllers/users_controller")

router.get("/", getUsers)

router.get("/logout", logout)

router.get("/:id", getUser)

router.post("/register", createUser)

router.delete("/:id", removeUser)

router.put("/:id", modifyUser)

router.post("/login", loginUser)

module.exports = router