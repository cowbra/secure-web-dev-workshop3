// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const bodyParser = require("body-parser");
const locationsService = require('./locations.service')
const jwt = require("jsonwebtoken");
const loginService = require("../users/users.service");

/** affiche toutes les locations. */
router.get('/locations', async (req, res) => {
	const locations = await locationsService.findAll();
	return res.status(200).send(locations)
})

/** Affiche une location précise identifiée par son ID. */
router.get('/locations/:id', async (req, res) => {
	const location = await locationsService.find(req.params.id)
	res.status(200).send(location)
})

/** Permet de créer une location */
router.post('/locations/', async (req, res) => {
	const location = await locationsService.create({...req.body})
	res.status(200).send(location)
})

/** Permet d'update une location */
router.put('/locations/:id', async (req, res) => {
	const location = await locationsService.update(req.params.id, {...req.body})
	res.status(200).send(location)
})

/** Route qui permet de supprimer une location précise */
router.delete('/locations/:id', async (req, res) => {
	const location = await locationsService.deleteO(req.params.id)
	res.status(200).send(location)
})


router.use(bodyParser.json());

const verifyUserToken = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).send("Unauthorized request !");
	}
	const token = req.headers["authorization"].split(" ")[1];
	if (!token) {
		return res.status(401).send("Access denied. \n No token provided.");
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

function roleMiddleware (allowedRoles) {
	return function (req, res, next) {

		if (allowedRoles.includes(req.user_role)) {
			return next()
		}
		return res.status(403).send()
	}
}


module.exports = router
