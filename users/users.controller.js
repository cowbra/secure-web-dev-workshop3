const router = require('express').Router()
const bodyParser = require("body-parser");
const loginService = require('./users.service')
const passport = require("passport");
const jwt = require("jsonwebtoken")


router.use(bodyParser.json());

router.post('/users/register', async (req, res) => {
    try{
        const login = await loginService.create(req.body)
        res.status(200).send(login)
    }
    catch (e)
    {
        // Code d'erreur pour un utilisateur existant déjà dans la bdd
        if(e.code==11000)
        {
            res.status(400).send("Username already exists")
        }
        else
        {
            res.status(400).send("Bad request")
        }
    }
})

router.get('/users', async (req, res) => {
    try{
        const login = await loginService.findAll();
        return res.status(200).send(login)
    }
    catch(e)
    {
        res.status(400).send("Bad request")
    }
})


router.get('/users/me', async (req, res) => {
    const login = await loginService.find(req.params.id)
    res.status(200).send(login)
})


router.put('/users/me', async (req, res) => {
    const login = await loginService.update(req.params.id, {...req.body})
    res.status(200).send(login)
})

router.delete('/users/me', async (req, res) => {
    const login = await loginService.deleteO(req.params.id)
    res.status(200).send(login)
})

router.post('/users/login',
    passport.authenticate('local',{session:false}),
    async (req, res) => {
        const user = await loginService.findU(req.params.username)
        const token = jwt.sign(
            { user_id: user._id},
            process.env.TOKEN_KEY,
            {
                expiresIn: "3600",
            }
        );
        res.status(200).send({"token" : token})
    });

const verifyUserToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request");
    }
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user_id = decoded.user_id;
        const role = await loginService.findR(req.user_id)
        req.user_role = role
        next();
    } catch (err) {
        res.status(400).send("Invalid token.");
    }
};


/** Check les roles autorisés à accéder à une requete*/
function roleMiddleware (allowedRoles) {
    return function (req, res, next) {
        if (allowedRoles.includes(req.user_role)) {
            return next()
        }
        return res.status(403).send()
    }
}

module.exports = router