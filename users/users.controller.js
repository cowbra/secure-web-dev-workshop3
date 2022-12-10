const router = require('express').Router()
const bodyParser = require("body-parser");
const loginService = require('./users.service')
const express = require("express");

router.use(bodyParser.json());

router.post('/users/register', async (req, res) => {
    try{
        const login = await loginService.create(req.body)
        res.status(200).send(login)
    }
    catch (error)
    {

        if(error.code==11000)
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
    catch(error)
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


module.exports = router