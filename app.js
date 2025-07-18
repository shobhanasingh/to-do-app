const express = require('express')
const mongoose = require('mongoose')
const {router} = require('./models/router')
const authRoutes = require('./routes/auth')
const app = express()
const port = 3000

app.use(express.json())

app.use('/todos',router)
app.use('/auth',authRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/todo-auth',{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=> console.log("Connection error",err))

app.listen(port,()=>{
    console.log("Server is listening at http://localhost:",port)
})