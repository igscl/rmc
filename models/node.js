const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Node = new Schema ({
    name:{
        type: String,
        required: true
    },
    members:{
        type: String,
        required: true
    },
    leader:{
        type: String,
        required: true
    }
    }
)

module.exports = mongoose.model("Node", Node)