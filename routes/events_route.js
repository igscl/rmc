const express = require("express")
const router = express.Router()
const {getEvents, createEvent} = require("../controllers/event_controller")
const { userAuthenticated, userIsVerified } = require("../utils/common_utils")

router.use(userAuthenticated)
// router.use(userIsVerified)

router.get("/", getEvents)
router.post("/", createEvent)

module.exports = router