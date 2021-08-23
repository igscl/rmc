const { getAllUsers,getUserById, addUser } = require("../utils/user_utilities")

const getUsers = function(req,res){
    getAllUsers(req).exec((err,users) => {
        if (err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.send(users)
    })
}

const getUser = function(req,res){
    getUserById(req.params.id).exec((err,user) => {
        if(err){
            res.status(404)
            return res.send("User not found")
        }
        res.send(user)
    })
}

const createUser = function(req,res){
    addUser(req.body).save((err,user) => {
        if(err){
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status(201)
        res.send(user)
    })
}

module.exports = {getUsers, getUser, createUser}