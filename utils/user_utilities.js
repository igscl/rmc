const User = require("../models/user")

const getAllUsers = function(req){
    if (req.query.country){
        return User.findByCountry(req.query.country)
    }else{
        return User.find()
    }
}

const getUserById = function(id){
    return User.findById(id)
}

const deleteUser = function(id){
    return User.findByIdAndRemove(id)
}

const updateUser = function(req){
    return User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
}

const validateEmail = async (req) =>{
    if(req.query.token){
    let user = await User.findByEmailToken(req.query.token)
    return User.findByIdAndUpdate(user, {
        new: true
    })}
}



module.exports = {getAllUsers, getUserById, deleteUser, updateUser, validateEmail}