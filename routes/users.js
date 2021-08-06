var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// localhost:3000/api/v1/users/register
router.post('/register', async (req, res) => {
  // check for username and password
  if (!req.body.email || !req.body.username || !req.body.password  || !req.body.gender) {
    return res.status(400).json({
      error: 'Please fill out email, username, password and gender fields'
    })
  }
  //check database for exisiting user
  const user = await models.User.findOne({
    where: {
      email: req.body.email
    }
  })

  const username = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })

  //if user email exists, send error
  if (user) {
    return res.status(400).json({
      error: 'user already exists'
    })
  }

  //if username exist, send error
  if (username) {
    return res.status(400).json({
      error: 'username is already taken'
    })
  }

  //hash password
  const hash = await bcrypt.hash(req.body.password, 10)

  //create user
  const newUser = await models.User.create({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    gender: req.body.gender,
  })
  
  //respond with success message
  return res.status(201).json(newUser)
})




// localhost:3000/api/v1/users/login
router.post('/login', async (req, res) => {

  //check for both email and password and sends error if missing one
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'please fill out email and password'
    })
  }

  //if both email and password are filled check to see if they are in database
  const user = await models.User.findOne({
    where: {
      email: req.body.email
    }
  })

  //if no user send error
  if (!user) {
    return res.status(400).json({
      error: 'could not find user with that email'
    })
  }

  //if user exists, check password, if no match send error
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(401).json({
      error: 'incorrect password'
    })
  }

  //store user info in session/log in
  req.session.user = user

  //respond with success
  return res.json({
    id: user.id,
    username: user.username,
    email:user.email,
    password:user.password,
    gender: user.gender,
  })
})

module.exports = router;
