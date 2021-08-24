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
    console.log(Date.now())
	req.body.modified_date = Date.now();
    return Node.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
}

const applyToNode = async(req) =>{

    console.log(Date.now())
	req.body.modified_date = Date.now();
    let node = await Node.findById(req.params.id)
    //don't join node if node leader or node member already
    if(!node.members.includes(req.user.id) && node.leader !== req.user.id){
        node.members.push(req.user.id)
    }
    return Node.findByIdAndUpdate(req.params.id, node, {
        new: true
    })
}

module.exports = {getAllNodes, getNodeById, addNode, deleteNode, updateNode, applyToNode}