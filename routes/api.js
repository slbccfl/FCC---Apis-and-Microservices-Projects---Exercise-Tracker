const Users = require('../models/users')
const Exercises = require('../models/exercises')

const router = require('express').Router()

// router.post('/new-user', (req, res, next) => {
//   const user = new Users(req.body);
//   user.save((err, savedUser) => { 
//     if (err) return next(err);
//     res.json({
//       username: savedUser.user.name,
//       _id: savedUser._id
//     })
//   })
// })

module.exports = router