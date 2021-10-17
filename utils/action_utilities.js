const Action = require("../models/action")

const getAllActions = function(req){
    return Action.find()
}

const addAction = function(req){
	req.body.create_date = Date.now();
    req.body.created_by = req.user.id
    return new Action(req.body)
}

module.exports = {getAllActions, addAction}