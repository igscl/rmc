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

const updateAction = function(req){
    console.log(Date.now())
	req.body.modified_date = Date.now();
    return Action.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
}

const deleteAction = function (req) {
    return Action.findByIdAndRemove(req.params.id)
}

module.exports = {getAllActions, addAction, loadAction, deleteAction, updateAction}