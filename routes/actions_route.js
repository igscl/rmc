const express = require("express")
const router = express.Router()
const {getActions} = require("../controllers/action_controller")
const { userAuthenticated, userIsVerified } = require("../utils/common_utils")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const {uploadFile, getFileStream} = require('../config/s3')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

router.use(userAuthenticated)
// router.use(userIsVerified)

router.get("/", getActions)

router.get("/upload/:key", (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)
    console.log(readStream)
    readStream.pipe(res)
})

router.post("/upload", upload.single('image'), async function (req, res) {
    console.log(req.file)
    const result = await uploadFile(req.file)
    await unlinkFile(req.file.path)
    console.log(result)
    res.send("File OK")
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

module.exports = router