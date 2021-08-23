const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema ({
    username: {
		type: String,
		unique: true,
		uniqueCaseInsensitive: true,
		required: true,
	},
    email: {
		type: String,
		required: true,
		unique: true,
		uniqueCaseInsensitive: true,
	},
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    node_member:{
        type: String,
        required: true
    },
    node_leader: {
		type: Boolean,
	},
    node_leader_list:{
        type: Array,
    },
    create_date: {
		type: Date,
		required: true,
	},
})

User.statics.findByNode = function (node){
    return this.find({node_member:node})
}

module.exports = mongoose.model("User", User)