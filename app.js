const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./routes/users_route")
const nodeRouter = require("./routes/nodes_route")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const port = process.env.port || 3000

const app = express()

app.use(cors())
app.use(express.json())

const dbConn = "mongodb://localhost/rmc"

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

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: false,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({
        mongooseConnection: mongoose.connection,
        mongoUrl: dbConn
    })
}))

app.get("/", (req,res)=> {
    console.log("THIS is the session",req.session)
    res.send(req.session)
})

app.use("/users", userRouter)
app.use("/nodes", nodeRouter)

app.listen(port, ()=> console.log(`server running on port ${port}`))