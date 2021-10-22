const Node = require("../models/node")

const getAllNodes = function(req){
    if (req.query.name){
        return Node.findByName(req.query.name)
    }else if (req.query.leader){
        return Node.findByLeader(req.user.id)
    }else if (req.query.members){
        return Node.findByMember(req.user.id)
    }
    else{
    return Node.find()
    }
}

const getNodeById = function(id){
    return Node.findById(id)
}

const addNode = function(req){
    // rypto.randomBytes(64).toString('base64').replace(/[^A-Za-z0-9]/g, "").substring(0,12);
    req.body.invitation_token = crypto.randomBytes(6).toString('hex')
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

const applyToNode = async (req) => {
    try {
        if(req.query.invitation!= null){
            console.log(Date.now())
            req.body.modified_date = Date.now();
            let node = await Node.findByInvitationToken(req.query.invitation)
            console.log("invitation", req.query.invitation)
            console.log("node", node)
            console.log("user", req.user)
            //don't join node if node leader or node member already
            if (!node[0].members.includes(req.user.id) && (node[0].leader !== req.user.id)) {
                node[0].members.push(req.user.id)
            } else if (node[0].leader === req.user.id) {
                console.log("You are the node leader, you cannot join this node", node[0].leader, req.user.id )
            } else {
                console.log("You already joined this node")
            }
            return Node.findByIdAndUpdate(node[0].id, node[0], {
                new: true
            })
        }

    } catch (err) {
        console.log("woops, cannot do that")
    }

}

const leaveNode = async(req) => {
    let node = await Node.findById(req.params.id)
    console.log(node.members)
    const index = node.members.indexOf(req.user.id);
    console.log(index)
    if (index > -1) {
        node.members.splice(index, 1);
        console.log(node)
        return Node.findByIdAndUpdate(node.id, node, {
            new: true
        })
    }else{
        return node
    }
}   

const getNodeCount = function(){
    return Node.countDocuments()
}

module.exports = {getAllNodes, getNodeById, addNode, deleteNode, updateNode, applyToNode, leaveNode, getNodeCount }