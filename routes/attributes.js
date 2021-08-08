var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt')
const checkAuth = require('../auth/CheckAuth');


//localhost:3000/api/v1/attributes/createAttributes
router.post('/createAttributes', async (req, res) => {
    const { user } = req.session

    // makes sure all fields are filled out
    if (!req.body.age || !req.body.gender || !req.body.height || !req.body.weight || !req.body.activityLevel || !req.body.goal) {
        return res.status(400).json({
            error: 'Please fill out all fields'
        })
    }

    const attribute = await models.Attribute.create({
        age: req.body.age,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        goal: req.body.goal,
        activityLevel: req.body.activityLevel,
        UserId: user.id
    })

    return res.status(201).json(attribute)
})

router.get('/getAttributes', async (req, res) => {
    const { user } = req.session;
    const attributes = await models.Attribute.findAll({
        where: {
            userId: user.id
        }
    })
    res.json(attributes)
})

module.exports = router;