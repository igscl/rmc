const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Node = new Schema ({
    name:{
        type: String,
        required: true,
        unique: true,
		uniqueCaseInsensitive: true,
        trim: true
    },
    members:{
        type: Array,
        required: true
    },
    leader:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        required: true
    },
    modified_date:{
        type: Date
    }
}
)

Node.statics.findByName = function (name){
    return this.find({name:name})
}

Node.statics.findByLeader = function (leader){
    return this.find({leader:leader})
}

//this is looking within the array
Node.statics.findByMember = function (members){
    return this.find({members:members})
}

module.exports = mongoose.model("Node", Node)