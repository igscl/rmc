const event = require("../models/event")
const {getAllEvents, addEvent, deleteEvent} = require("../utils/event_utilities")

const getEvents = function (req,res){
    getAllEvents(req).exec((err,events)=> {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.send(events)
    })
}

const createEvent = function(req,res){
    addEvent(req).save((err,event) => {
        if(err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status(201)
        res.send(event)
    })
}

module.exports = {getEvents, createEvent}