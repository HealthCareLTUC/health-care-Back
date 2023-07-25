`use strict`
const express = require("express")
const app = express()
const pg = require("pg");
const cors = require('cors');
const axios = require('axios')
require("dotenv").config()
const serverError=require('./errors/500')
const NotFoundError=require('./errors/404')
const RouteAxios=require('./Routes/RouteAxios')
const RouteDB=require('./Routes/RouteDB')
const RouteRedirect=require('./Routes/redirect')
const client =require('./client')
const {PORT}=require('./config')
app.use(express.json());


//app middle ware
app.use(cors())
app.use(express.json())

app.use(RouteAxios)
app.use(RouteDB)
app.use(RouteRedirect)

//error middleware
app.use(serverError)
app.use(NotFoundError)











client.connect(() => {
    app.listen(PORT, () => {
        console.log(`Server listen to ${PORT} port`)


    })
})





