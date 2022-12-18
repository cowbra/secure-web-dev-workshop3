const Login = require('./users.model')
const bcrypt = require("bcrypt")

//FICHIER QUI CONTIENT LES FONCTIONS APPELEES PAR LE CONTROLLER

/** Créé une location. */
async function create(updateInfo) {
    const salt = 8
    const login = new Login({...updateInfo, password: await bcrypt.hash(updateInfo.password, salt)})
    await login.save()
    return login
}


async function checkPassword(username,password){
    const user = await Login.findOne({username})
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return false
    }
    return user
}

/** retourne  toutes les locations */
function findAll () {
    return Login.find().select({"password":0})
}

/** retourne une locaation précise */
function find(id) {
    return Login.findOne(
        {_id:id}
    )
}

function findU(username) {
    return Login.findOne(
        {_username:username}
    )
}

/** Met à jour les données d'une location */
function update(id,updateInfo){
    const login = find(id);
    return login.update(updateInfo)
}

/** Supprime une location. */
function deleteO(id){
    return Login.deleteOne(find({_id:id}))
}

function login(body){
    try{
        Login.findOne({"username":body.username})
    }
    catch (e){
    }
}

module.exports = {create,find,findAll,update,deleteO,login,checkPassword,findU}