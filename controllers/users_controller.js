const { getAllUsers,getUserById, deleteUser, updateUser, validateEmail, findEmail, findPwResetToken, getCount } = require("../utils/user_utilities")
const User = require("../models/user")
const passport = require("passport")
const sgMail = require('@sendgrid/mail')
global.crypto = require('crypto')

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
    let token = crypto.randomBytes(36).toString('hex');
    // let strippedUsername = req.body.username.replace(/\W/g, '').toLowerCase()
    // console.log(strippedUsername)
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        is_admin: req.body.is_admin,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        country: req.body.country,
        create_date: Date.now(),
        email_token: token
    }), req.body.password, function(err){
        if(err){
            res.status(500)
            res.json({
                error: err
            })
        }else{
            const msg = {
                to: 'igngdev@gmail.com', // Change to your recipient
                from: 'no-reply@redmundialcorazones.org', // Change to your verified sender
                subject: 'Verifica tu correo para la Red Mundial de Corazones',
                text: `Para activar tu cuenta, ingresa aquí: http://localhost:3009/users/validate?token=${token}`,
                html: `Para activar tu cuenta, <a href="http://localhost:3009/users/validate?token=${token}">ingresa a este link</a>`,
              }
              sgMail
                .send(msg)
                .then(() => {
                  console.log('Email sent')
                })
                .catch((error) => {
                  console.error(error)
                })
            loginUser(req, res)
        }
    })
}

const authenticate = passport.authenticate("local")
// helper function

const loginUser = (req, res) => {
    // passport.authenticate returns a function that we will call 
//with req, res, and a callback function to execute on success    

    authenticate(req, res, function () {
        console.log('authenticated user: ', req.user);
        console.log('session: ', req.session);
        res.status(200);
        // res.json({user: req.user, sessionID: req.sessionID});
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
        // if (req.params.id !== req.user.id){
        //     res.status(500)
        //     return res.json({
        //         error:"cannot update another user"
        //     })
        // }
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

const resetUserPassword = function(req,res){
    findPwResetToken(req).then(async (user) =>{
        console.log("RESETTING PASSWORD FOR:",user)
        await user.setPassword(req.body.password)
        await user.save()
        res.status(200).send(user)
    }).catch((err) =>{
        res.status(500).json({error: err.message})
    })
}

const generatePwToken = function (req,res){
    let token = crypto.randomBytes(36).toString('hex');
    findEmail(req).then((user) =>{
        user.pass_reset_token = token
        user.save()
        //send email message with code
        const msg = {
            to: 'igngdev@gmail.com', // Change to your recipient
            from: 'no-reply@redmundialcorazones.org', // Change to your verified sender
            subject: 'Cambia tu clave para la Red Mundial de Corazones',
            text: `Para resetear la clave, ingresa a este link: http://localhost:3009/users/password?token=${token}`,
            html: `Para resetear la clave, <a href="http://localhost:3009/users/password?token=${token}">ingresa a este link</a>`,
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Password reset email sent')
            })
            .catch((error) => {
                console.error(error)
            })
        //            
        res.status(200).send(user)
    }).catch((err) =>{
        res.status(500).json({error: err.message})
    })
}

const validateUser = function(req,res){
    if (req.error){
        console.log(req.error.message)
        res.status(req.error.status)
        res.send(req.error.message)

    }else{
        validateEmail(req).then((user) =>{
            console.log("cccc",user)
            user.is_verified = true
            user.save()
            res.status(200).send(user)
        }).catch((err) =>{
            res.status(500).json({error: err.message})
        })
    }
}

const getUserCount = function (req,res) {
    getCount(req).exec((err,count) => {
        if(err){
            res.status(404)
            return res.sendStatus("An error ocurred")
        }
        res.status(200)
        res.send([count])
    })
}


module.exports = {getUsers, 
    getUser, 
    createUser, 
    removeUser, 
    modifyUser, 
    loginUser, 
    logout, 
    validateUser, 
    resetUserPassword,
    generatePwToken,
    getUserCount
}
