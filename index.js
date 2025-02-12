const express = require('express')
const locationController = require('./locations/locations.controller')
const usersController = require('./users/users.controller')
const mongoose = require('mongoose')
require('dotenv').config()
const localStrategy = require("./authentication/local.strategy")
const app = express()
const port = 3000



app.use(locationController)
app.use(usersController)

async function main(){
    const client = await mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Connected")});
    app.listen(port, () => {
        console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
    })
}
main()


app.get('', (req,res) => {    res.send("Hello World")})