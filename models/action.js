const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Action = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    create_date:{
        type: Date,
        required: true
    },
    modified_date:{
        type: Date
    },
    action_duration:{
        type: String,
        required: true
    },
    category:{
        type: String
    },
    actions:{
        type: String,
        required: true
    },
    files:{
        type: Array
    },
    created_by:{
        type: String,
        required:true
    },

})

module.exports = mongoose.model("Action", Action)