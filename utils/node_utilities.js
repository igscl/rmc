const Node = require("../models/node")

const getAllNodes = function(req){
    if (req.query.name){
        return Node.findByName(req.query.name)
    }else if (req.query.leader){
        return Node.findByLeader(req.query.leader)
    }else if (req.query.members){
        return Node.findByMember(req.query.members)
    }
    else{
    return Node.find()
    }
}

const getNodeById = function(id){
    return Node.findById(id)
}

const addNode = function(req){
	req.body.create_date = Date.now();
    console.log(req.body)
    req.body.leader = req.user.id
    return new Node(req.body)
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
    if(!node.members.includes(req.user.id) /*&& node.leader !== req.user.id */){
        node.members.push(req.user.id)
    }
    return Node.findByIdAndUpdate(req.params.id, node, {
        new: true
    })
}

module.exports = {getAllNodes, getNodeById, addNode, deleteNode, updateNode, applyToNode}