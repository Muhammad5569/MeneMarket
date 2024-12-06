const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')


const userRouter = require('./routers/users')

const app = express()
const port = process.env.PORT | 3000

app.use(express.json())
app.use(userRouter)

app.listen(port, ()=>{
    console.log('Server is up on port: '+port)
})