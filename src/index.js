const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')
dotenv.config()

const app = express()
const port = process.env.PORT
app.use(bodyParser.json());

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('connect DB success')
})
.catch((e) => {
    console.log(e)
})


app.listen(port, () =>{
    console.log('connecting with port '+ port)
})
