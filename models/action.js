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
    actions:{
        type: Array,
        required: true
    },
    files:{
        type: String
    }

})

module.exports = mongoose.model("Action", Action)