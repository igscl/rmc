const {getAllActions} = require("../utils/action_utilities")

const getActions = function(req,res) {
    getAllActions(req).exec((err,nodes)=> {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.send(nodes)
    })
}

module.exports = {getActions}