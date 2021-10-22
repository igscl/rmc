const express = require("express")
const router = express.Router()
const {getNodes, getNode, createNode, removeNode, modifyNode, joinNode, exitNode, returnNodeCount} = require("../controllers/node_controller")
const { userAuthenticated, userIsVerified } = require("../utils/common_utils")

router.use(userAuthenticated)
// router.use(userIsVerified)

router.get("/", getNodes)

router.get("/join", joinNode)

router.get("/:id/exit", exitNode)

router.get("/count", returnNodeCount)

router.get("/:id", getNode)

router.post("/", createNode)

router.delete("/:id", removeNode)

router.put("/:id", modifyNode)

module.exports = router