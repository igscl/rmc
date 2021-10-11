const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Event = new Schema ({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    }
})