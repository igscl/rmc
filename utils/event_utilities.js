const Event = require("../models/event")

const getAllEvents = function(req){
    return Event.find()
}

const addEvent = function(req){
	req.body.date = Date.now();
    req.body.created_by = req.user.id
    return new Event(req.body)
}

const deleteEvent = function (req) {
    return Event.findByIdAndRemove(req.params.id)
}

module.exports = {getAllEvents, addEvent, deleteEvent}