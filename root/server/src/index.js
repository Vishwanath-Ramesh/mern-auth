const express = require('express')
const cors = require('cors')

const AuthRouter = require('./routes/auth')
const UserRouter = require('./routes/users')
const AuthController = require('./controller/auth')
const mongoClient = require('./service/database')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors({ origin: true }))

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  next()
})

app.use('/auth', AuthRouter)
app.use('/api', AuthController.authenticate, UserRouter)

app.listen(port, () => mongoClient.connect())
