const express = require("express")
const router = express.Router()
const {getActions, createAction, viewUploadedAction, uploadSingle, getAction} = require("../controllers/action_controller")
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

router.post("/upload", upload.single('image'), uploadSingle)

router.get("/:id", getAction)

module.exports = router