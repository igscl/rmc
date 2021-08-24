const { getAllUsers,getUserById, deleteUser, updateUser } = require("../utils/user_utilities")
const User = require("../models/user")
const passport = require("passport")

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
        let date = Date.now()
        console.log(Date.now())

    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        is_admin: req.body.is_admin,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country,
        create_date: date
    }), req.body.password, function(err){
        if(err){
            res.status(500)
            res.json({
                error: err
            })
        }else{
            loginUser(req, res)
        }
    })
}

const loginUser = function(req, res) {
    passport.authenticate('local')(req, res, function () {
        console.log('authenticated', req.user.username)
        console.log('session:', req.session)
        console.log('user:', req.user)
        res.json(req.user)
    })
}

const logout = function(req,res){
    req.logout()
    console.log('user logged out')
    console.log('session:', req.session)
    console.log('user:', req.user)
    res.sendStatus(200)
}

const removeUser = function(req,res){
    deleteUser(req.params.id).exec((err,user) =>{
        if(err){
            res.status(404)
            return res.json({
                error: err.message
            })
        }
        res.sendStatus(204)
    })
}

const modifyUser = function(req,res){
    updateUser(req).exec((err,user) =>{
        if(err){
            res.status(500)
            return res.json({
                error:err.message
            })
        }
        res.status(200)
        res.send(user)
    })
}

module.exports = {getUsers, getUser, createUser, removeUser, modifyUser, loginUser, logout}
