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
    if (err) return next(err);
    res.json(data)
  })
})

router.post('/add', (req, res, next) => {
  Users.findById(req.body.userId, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return next(err)
    }
    if (req.body.date == '') {
      let today = new Date().toISOString().slice(0, 10);
      req.body.date = today;
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
  if (Object.keys(req.query).length == 0 || req.query.userId == '') {
    Exercises.find({}, (err, data) => {
      if (err) return next(err);
      res.json(data)
    })
  } else {
    console.log('non-empty /log request');
    let out = {};
    Users.findById(req.query.userId, (err, user) => {
      Exercises.find({
        userId: req.query.userId
      })
      .exec((err, exercises) => {
        if (err) return next(err)
        console.log('user(typeof):  ' + user + '(' + typeof(user) + ')');
        out = user.toJSON();
        delete out.__v;
        console.log('exercises.length:  ' + exercises.length);
        out['count'] = exercises.length;
        out['log'] = exercises.map(e => ({
          description: e.description,
          duration: e.duration,
          date: e.date.toDateString()
        }))
        console.log(out);
        res.json(out)
      })
    })
  }
})

router.delete('/delete-user', (req, res, next) => {
  res.send({type: 'DELETE-USER'})
})

module.exports = router