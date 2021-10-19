const {getAllActions, addAction, loadAction, deleteAction} = require("../utils/action_utilities")
const {uploadFile, getFileStream} = require('../config/s3')
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const getActions = function(req,res) {
    getAllActions(req).exec((err,actions)=> {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        // console.log(actions)
        res.send(actions)
    })
}

const getAction = function (req, res) {
    loadAction(req).exec((err, action) => {
        if (err) {
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        console.log("LOADING ACTION", action)
        res.json(action)
    })
}

const createAction = function(req,res){
    addAction(req).save((err,action) => {
        if(err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        // action.files.push(req.file.key)
        // console.log("KEY!!!!",req)
        // action.save()
        res.status(201)
        res.send(action)
    })
}

const removeAction = function (req,res) {
    deleteAction(req).exec((err,event)=>{
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.sendStatus(204)
    })
}

const viewUploadedAction = function (req, res) {
    const key = req.params.key
    const readStream = getFileStream(key)
    .on('error', (e) => {
        console.log(e)
        res.status(500).json({ error: e.message })
      })
    // console.log(readStream)
    readStream.pipe(res)
    // .on('data', (data) => {
    //     // data
    //   })
}

const uploadSingle = async function (req, res) {
    console.log("REQ file",req.file)
    const result = await uploadFile(req.file)
    await unlinkFile(req.file.path)
    const description = req.body.description
    res.send({file: `${result.Key}`})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  }

module.exports = {getActions, createAction, viewUploadedAction, uploadSingle, getAction, removeAction}