const mongoose = require('mongoose')

//creation du modele de user/mdp pour mongoDB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique : true,
        required : true
    },
    password:
        {
            type : String,
            required : true
        },
    role:
        {type: String,}
})

const Login = mongoose.model('users-login', userSchema)

module.exports = Login