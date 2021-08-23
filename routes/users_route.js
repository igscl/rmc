const express = require("express")
const router = express.Router()
const {getUsers, getUser, createUser} = require("../controllers/users_controller")

router.get("/", getUsers)

router.get("/:id", getUser)

router.post("/", createUser)


module.exports = router