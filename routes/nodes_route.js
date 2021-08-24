const express = require("express")
const router = express.Router()
const {getNodes, getNode, createNode, removeNode, modifyNode, joinNode} = require("../controllers/node_controller")
const { userAuthenticated } = require("../utils/common_utils")

router.use(userAuthenticated)

router.get("/", getNodes)

router.get("/:id", getNode)

router.post("/", createNode)

router.delete("/:id", removeNode)

router.put("/:id", modifyNode)

router.put("/:id/join", joinNode)

module.exports = router