const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./routes/users_route")
const nodeRouter = require("./routes/nodes_route")
const actionRouter = require("./routes/actions_route")
const eventRouter = require("./routes/events_route")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const passport = require('passport')
const sgMail = require('@sendgrid/mail')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

const allowURLs = [
	'http://localhost:3000',
	'https://rmc-planeta.netlify.app',
    'https://redmundialcorazones.org',
    'https://www.redmundialcorazones.org',
    'https://red-mundial-rmc.herokuapp.com'

]

app.use(cors({
    origin: function (origin, callback) {
		const allowURLsIndex = allowURLs.findIndex((url) => url.includes(origin));
		callback(null, allowURLsIndex > -1);
	},
    credentials: true
}))
app.use(express.json())

const dbConn = process.env.MONGODB_URI || "mongodb://localhost/rmc"

mongoose.connect(
    dbConn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex:true
    },
    err => {
        if (err){
            console.log("error connecting database", err)
        } else {
            console.log("connected to database")
        }
     }
)

require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
console.log(process.env.SENDGRID_API_KEY)
console.log(process.env.SECRET)

const port = process.env.PORT || 3009

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie:{
        expires: false,
        sameSite: 'none',
        secure: true,
        httpOnly: false,
        // 3 months
        maxAge: 3 * 30 * 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({
        mongooseConnection: mongoose.connection,
        mongoUrl: dbConn
    })
}))

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://rmc-planeta.netlify.app")
    res.header("Access-Control-Allow-Credentials", true)
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
  })

require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req,res)=> {
    console.log("THIS is the session",req.session)
    res.send(req.session)
})

app.use("/users", userRouter)
app.use("/nodes", nodeRouter)
app.use("/actions", actionRouter)
app.use("/events", eventRouter)

app.listen(port, ()=> 
console.log(`server running on port ${port}`
))