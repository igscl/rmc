const express = require("express")
const router = express.Router()
const {getActions} = require("../controllers/action_controller")
const { userAuthenticated, userIsVerified } = require("../utils/common_utils")

router.use(userAuthenticated)
// router.use(userIsVerified)

router.get("/", getActions)

module.exports = router