const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportLocalMongoose =require('passport-local-mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const User = new Schema ({
    username: {
        type: String,
		required: true,
		unique: true,
		lowercase: true,
        trim: true
    },
    email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
        trim: true
	},
    is_verified:{
        type: Boolean,
        default: false
    },
    is_admin:{
        type: Boolean,
        default: false,
        required: true
    },
    is_super_admin:{
        type: Boolean,
        default: false,
        required: true
    },
    first_name:{
        type: String,
        // required: true,
        trim: true
    },
    last_name:{
        type: String,
        // required: true,
        trim: true
    },
    country:{
        type:String,
        // required: true,
        trim: true
    },
    email_token:{
        type:String
    },
    pass_reset_token:{
        type:String
    },
    create_date: {
		type: Date,
		required: true,
	},
})

User.statics.findByCountry = function (country){
    return this.find({country:country})
}

User.statics.findByEmailToken = function (token){
    return this.find({email_token:token})
}

User.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});

User.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", User)