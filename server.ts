// Server Setup
import express from 'express'
const app: express.Application = express()
import bodyParser from 'body-parser'
import cors from 'cors'
const PORT: string | number = process.env.PORT || 3005

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
import auth from './server/routes/auth'
import game from './server/routes/game'

// Game Cycle
import { gameCycle } from './server/cycle'
setInterval(gameCycle, 10000)

app.use('/user', auth)
app.use('/game', game)

// Add IP for mobile testing
app.listen(PORT, (): void => console.log(`Listening on ${PORT}`))