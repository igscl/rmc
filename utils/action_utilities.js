const Action = require("../models/action")

const getAllActions = function(req){
    return Action.find()
}

module.exports = {getAllActions}