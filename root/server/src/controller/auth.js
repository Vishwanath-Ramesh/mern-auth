const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const mongoClient = require('../service/database')

async function signUp(req, res) {
  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 12)

  const { insertedId } = await mongoClient
    .db('dbusers')
    .collection('users')
    .insertOne({
      email,
      password: hashedPassword,
    })

  return res.status(201).send({ data: { id: insertedId } })
}

async function login(req, res) {
  const { email, password } = req.body
  let isValidPassword = false
  let token = null

  const loggingInUser = await mongoClient
    .db('dbusers')
    .collection('users')
    .findOne({ email })

  isValidPassword = await bcrypt.compare(password, loggingInUser.password)

  if (!isValidPassword)
    return res.status(400).send({ message: 'Invalid email-id or password' })

  token = jwt.sign(
    { userId: loggingInUser._id, emailId: loggingInUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )
  return res
    .status(200)
    .send({ userId: loggingInUser._id, emailId: loggingInUser.email, token })
}

function authenticate(req, res, next) {
  const token = req.headers?.authorization?.split(' ')[1]
  const idToken = !_.isEmpty(token)
    ? jwt.verify(token, process.env.JWT_SECRET)
    : null

  if (token && idToken?.userId) next()
  else res.status(401).send({ message: 'Not Authorized' })
}

module.exports = {
  login,
  signUp,
  authenticate,
}
