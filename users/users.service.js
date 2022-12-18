const Login = require('./users.model')
const bcrypt = require("bcrypt")

//FICHIER QUI CONTIENT LES FONCTIONS APPELEES PAR LE CONTROLLER

/** Créé un user. */
async function create(updateInfo) {
    const salt = 8
    //bcrypt hache le mdp avec notre salt automatiquement
    const login = new Login({...updateInfo, password: await bcrypt.hash(updateInfo.password, salt)})
    await login.save()
    return login
}

/** compare le mdp haché et celui entré par un user lors du login*/
async function checkPassword(username,password){
    const user = await Login.findOne({username})
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return false
    }
    return user
}

/** retourne  tous les users sans leur mdp*/
function findAll () {
    return Login.find().select({"password":0})
}

/** retourne un user précis par son id */
function find(id) {
    return Login.findOne(
        {_id:id}
    )
}

/** retourne un user précis par son nom */
function findU(username) {
    return Login.findOne(
        {_username:username}
    )
}

/** Met à jour les données d'un user */
function update(id,updateInfo){
    const login = find(id);
    return login.update(updateInfo)
}

/** Supprime un user. */
function deleteO(id){
    return Login.deleteOne(find({_id:id}))
}
/** verifie si l'uilisateur existe avant de se login*/
function login(body){
    try{
        Login.findOne({"username":body.username})
    }
    catch (e){
    }
}

/** retourne le role d'un user s'il existe */
async function findR(id) {
    var ID = ObjectID(id)
    const user = await Login.findOne({_id : ID})
    return user.role
}

module.exports = {create,find,findAll,update,deleteO,checkPassword,findU}