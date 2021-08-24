const passport = require("passport")
const User = require("../models/user")
//set-up passport_local strategy with the correct options
passport.use(User.createStrategy())
//generates a function that serializes users into sessions
passport.serializeUser(User.serializeUser())

passport.deserializeUser(User.deserializeUser())