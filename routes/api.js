const Users = require('../models/users')
const Exercises = require('../models/exercises')

const router = require('express').Router()

router.post('/new-user', (req, res, next) => {
  const user = new Users(req.body);
  user.save((err, savedUser) => { 
    if (err) return next(err);
    res.json({
      username: savedUser.username,
      _id: savedUser._id
    })
  })
})

router.get('/users', (req,res,next) => {
  Users.find({}, (err, data) => {
    res.json(data)
  })
})

router.post('/add', (req, res, next) => {
  Users.findById(req.body.userId, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return next(err)
    }
    const exercise = new Exercises(req.body)
    exercise.username = user.username
    exercise.save((err, savedExercise) => {
      if (err) return next(err)
      res.json(savedExercise)
    })
      
  })
})

router.get('/log', (req, res, next) => {
   console.log(req);
})

module.exports = router