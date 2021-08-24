const express = require("express")
const router = express.Router()
const {getUsers, getUser, createUser, removeUser, modifyUser} = require("../controllers/users_controller")

router.get("/", getUsers)

router.get("/:id", getUser)

router.post("/", createUser)

router.delete("/:id", removeUser)

router.put("/:id", modifyUser)

module.exports = router