const Node = require("../models/node")

const getAllNodes = function(req){
    if (req.query.name){
        return Node.findByName(req.query.name)
    }else{
    return Node.find()
    }
}

const getNodeById = function(id){
    return Node.findById(id)
}

const addNode = function(body){
    let date = Date.now();
    console.log(Date.now())
	body.create_date = date;
    return new Node(body)
}

const deleteNode = function(id){
    return Node.findByIdAndRemove(id)
}

const updateNode = function(req){
    let date = Date.now();
    console.log(Date.now())
	req.body.modified_date = date;
    return Node.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
}

module.exports = {getAllNodes, getNodeById, addNode, deleteNode, updateNode}