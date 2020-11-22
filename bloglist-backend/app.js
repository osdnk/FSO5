require('./helpers/mongo')
const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./helpers/errorHandler')
const blog = require('./controllers/blog')
const user = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middlewareToken = require('./helpers/middleware')


app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


app.use(middlewareToken)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blog)
app.use('/api/users', user)


app.use(errorHandler)


module.exports = app
