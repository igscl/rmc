const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const port = process.env.port || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.listen(port, ()=> console.log(`server running on port ${port}`))