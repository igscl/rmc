const Action = require("../models/action")

const getAllActions = function(req){
    return Action.find()
}

const loadAction = function(req) {
    return Action.findById(req.params.id)
}

const addAction = function(req){
	req.body.create_date = Date.now();
    req.body.created_by = req.user.id
    return new Action(req.body)
}

const deleteAction = function (req) {
    return Action.findByIdAndRemove(req.params.id)
}

module.exports = {getAllActions, addAction, loadAction, deleteAction}