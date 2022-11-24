const express = require('express')

const locationController = require('./locations/locations.controller')
const application_listener = express()
const port = 3000

const mongoose = require('mongoose')
require('dotenv').config()

application_listener.use(locationController)


async function main(){
    const result = await mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Connected")});
    application_listener.listen(port, () => {
        console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
    })
}
main()






application_listener.get('', (req,res) => {    res.send("Hello World")})