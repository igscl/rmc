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
    create_date: {
		type: Date,
		required: true,
	},
})

User.statics.findByCountry = function (country){
    return this.find({country:country})
}

module.exports = mongoose.model("User", User)