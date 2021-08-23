const express = require("express")
const router = express.Router()
const {getNodes} = require("../controllers/node_controller")

router.get("/", getNodes)

module.exports = router