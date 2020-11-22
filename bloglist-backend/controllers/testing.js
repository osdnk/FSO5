require('../helpers/mongo')
const app = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')


app.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})


app.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('sample', saltRounds)

  const user = new User({  name: 'michal osadnik',
    username: 'michal',
    passwordHash
  })
  await user.save()
  response.status(204).end()
})


app.delete('/:id', async (request, response) => {

})

module.exports = app
