const User = require("../models/user")

const getAllUsers = function(){
    return User.find()
}

const getUserById = function(id){
    return User.findById(id)
}

module.exports = {getAllUsers, getUserById}