const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const mongodb = require('mongodb')

const mongoClient = require('../service/database')

async function createUser(req, res) {
  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = await mongoClient
    .db('dbusers')
    .collection('users')
    .insertOne({
      email,
      password: hashedPassword,
    })

  return res
    .status(201)
    .send({ userId: newUser.insertedId, message: 'User created successfully' })
}

async function deleteUser(req, res) {
  const { email } = req.body
  const { deletedCount } = await mongoClient
    .db('dbusers')
    .collection('users')
    .deleteOne({
      email,
    })

  return res.status(202).send({
    message: 'Deleted successfully',
    deletedCount,
  })
}

async function updateUser(req, res) {
  const token = req.headers.authorization.split(' ')[1]
  const payload = req.body
  const idToken = jwt.verify(token, process.env.JWT_SECRET)

  if (_.isEmpty(idToken))
    return res.status(401).send({ message: 'Not authorized' })

  if (!_.isEmpty(payload.password))
    payload.password = await bcrypt.hash(payload.password, 12)

  await mongoClient
    .db('dbusers')
    .collection('users')
    .updateOne(
      { _id: new mongodb.ObjectID(idToken.userId) },
      {
        $set: { ...payload },
      }
    )

  return res.status(200).send({ message: 'Updated successfully' })
}

async function getAllUsers(req, res) {
  const result = await mongoClient
    .db('dbusers')
    .collection('users')
    .find()
    .toArray()

  return res.status(200).send({
    data: result,
  })
}

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
}
