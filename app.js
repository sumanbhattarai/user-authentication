const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const auth  = require('./routes/auth')
const port = process.env.PORT || 3000


const app = express()
app.use(cors())
app.use(bodyParser.json())



app.use('/api/user' , auth )

app.listen(port , ()=>{
    console.log(`Server is running at ${port}.`)
})