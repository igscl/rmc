const User = require("../models/user")

const getAllUsers = function(req){
    if (req.query.node){
        return User.findByNode(req.query.node)
    }else{
        return User.find()
    }
    
}

const getUserById = function(id){
    return User.findById(id)
}

const addUser = function(body){
    let date = Date.now();
    console.log(Date.now())
	body.create_date = date;
    return new User(body)
}

module.exports = {getAllUsers, getUserById, addUser}