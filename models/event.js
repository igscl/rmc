const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Event = new Schema ({
    name:{
        type: String,
        required: true,
        trim: true
    },
    create_date:{
        type: Date,
    },
    event_date:{
        type: String,
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    url:{
        type: String
    },
    created_by:{
        type: String
    }
})

module.exports = mongoose.model("Event", Event)