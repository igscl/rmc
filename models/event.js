const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Event = new Schema ({
    name:{
        type: String,
        required: true,
        trim: true
    },
    date:{
        type: Date,
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    created_by:{
        type: String
    }
})

module.exports = mongoose.model("Event", Event)