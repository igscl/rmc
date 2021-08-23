const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

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
        useFindAndModify: true
    },
    err => {
        if (err){
            console.log("error connecting database", err)
        } else {
            console.log("connected to database")
        }
     }
)

app.listen(port, ()=> console.log(`server running on port ${port}`))