const express = require("express")
const router = express.Router()
const {getActions, createAction, viewUploadedAction, uploadSingle, getAction, removeAction, modifyAction} = require("../controllers/action_controller")
const { userAuthenticated, userIsVerified } = require("../utils/common_utils")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
// const {uploadFile, getFileStream} = require('../config/s3')
// const fs = require('fs')
// const util = require('util')
// const unlinkFile = util.promisify(fs.unlink)

router.use(userAuthenticated)
// router.use(userIsVerified)

router.get("/", getActions)

router.post("/", createAction)

router.get("/upload/:key", viewUploadedAction)

router.delete("/:id", removeAction)

router.post("/upload", upload.single('image'), uploadSingle)

router.get("/:id", getAction)

router.put("/:id", modifyAction)

module.exports = router