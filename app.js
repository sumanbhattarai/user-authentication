const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth  = require('./routes/auth')
const port = process.env.PORT || 3000
require('dotenv').config()


const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/user' , auth )

mongoose.connect(
    process.env.DB_URl,
    { useNewUrlParser: true , useUnifiedTopology: true },
    ()=>{console.log('Connected to DB.')}
)

app.listen(port , ()=>{
    console.log(`Server is running at ${port}.`)
})