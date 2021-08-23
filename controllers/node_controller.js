const {getAllNodes} = require("../utils/node_utilities")

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

module.exports = {getNodes}