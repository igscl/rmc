const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema ({
    username: {
		type: String,
		unique: true,
		lowercase: true,
        trim: true,
		required: true
	},
    email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
        trim: true
	},
    is_admin:{
        type: Boolean
    },
    first_name:{
        type: String,
        required: true,
        trim: true
    },
    last_name:{
        type: String,
        required: true,
        trim: true
    },
    country:{
        type:String,
        required: true,
        trim: true
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