// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const bodyParser = require("body-parser");
const locationsService = require('./locations.service')

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

/** PErmet de créer une location */
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

module.exports = router
