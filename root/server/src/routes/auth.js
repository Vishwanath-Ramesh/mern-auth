const { Router } = require('express')

const AuthController = require('../controller/auth')

const router = Router()

router
  //   .route('/auth')
  .post('/signup', AuthController.signUp)
  .post('/login', AuthController.login)

module.exports = router
