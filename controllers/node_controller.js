const node = require("../models/node")
const {getAllNodes, getNodeById, addNode, deleteNode, updateNode} = require("../utils/node_utilities")

const getNodes = function (req,res){
    getAllNodes(req).exec((err,nodes)=> {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.send(nodes)
    })
}

const getNode = function(req,res){
    getNodeById(req.params.id).exec((err,node) => {
        if(err){
            res.status(404)
            return res.send("Node not found")
        }
        res.send(node)
    })
}

const createNode = function(req,res){
    addNode(req.body).save((err,node) => {
        if(err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status(201)
        res.send(node)
    })
}

const removeNode = function(req,res){
    deleteNode(req.params.id).exec((err,node) =>{
        if(err){
            res.status(404)
            return res.json({
                error: err.message
            })
        }
        res.sendStatus(204)
    })
}

const modifyNode = function(req,res){
    updateNode(req).exec((err,node) =>{
        if(err){
            res.status(500)
            return res.json({
                error:err.message
            })
        }
        res.status(200)
        res.send(node)
    })
}

module.exports = {getNodes, getNode, createNode, removeNode, modifyNode}