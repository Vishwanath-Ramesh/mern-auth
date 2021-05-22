const configs = {
  databaseURI: `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster-mern-app.xk4x2.mongodb.net?retryWrites=true&w=majority`,
}

module.exports = {
  configs,
}
