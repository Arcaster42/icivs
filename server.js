const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3005

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const queries = require('./database/queries')

app.get('/test', (req, res) => {
  res.status(200).send('OK')
})

app.post('/user/login', async (req, res) => {
  const userObj = req.body
  if (!userObj.email || !userObj.password) res.status(401).send('Missing Credentials')
  else
    try {
      const results = await queries.loginUser(userObj)
      if (results.err) res.status(401).send(results)
      else if (results.id) res.status(202).send(results)
      else res.status(500).send(results)
    } catch (err) {
      res.status(500).send(err)
    }
})

app.post('/user/registration', async (req, res) => {
  const userObj = req.body
  if (!userObj.email || !userObj.password) res.status(401).send('Missing Credentials')
  else
    try {
      const results = await queries.registerUser(userObj)
      res.send(results)
    } catch (err) {
      res.status(500).send(err)
    }
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))