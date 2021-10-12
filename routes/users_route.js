const express = require("express")
const router = express.Router()
const {getUsers, getUser, createUser, removeUser, modifyUser, loginUser, logout, validateUser, resetUserPassword} = require("../controllers/users_controller")
const { userAuthenticated, userIsVerified, /*userIsAdministrator */} = require("../utils/common_utils")

router.post("/register", createUser)

router.get("/logout", logout)

router.post("/login", loginUser)

router.get("/validate", validateUser)

router.use(userAuthenticated)
// router.use(userIsVerified)

router.get("/", getUsers)

router.get("/:id", getUser)

router.put("/:id/password", resetUserPassword )

// router.use(userIsAdministrator)

router.delete("/:id", removeUser)

module.exports = router