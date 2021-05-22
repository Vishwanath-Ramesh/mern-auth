const { Router } = require('express')

const UserController = require('../controller/users')

const router = Router()

router
  .route('/user')
  .get(UserController.getAllUsers)
  .post(UserController.createUser)
  .delete(UserController.deleteUser)
  .patch(UserController.updateUser)

module.exports = router
