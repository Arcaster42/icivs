// Server Setup
import express from 'express'
const app: express.Application = express()
import * as http from 'http'
const server: http.Server = new http.Server(app)
import * as socketio from 'socket.io'
import bodyParser from 'body-parser'
import cors from 'cors'
const PORT: string | number = process.env.PORT || 3005
const PORT_WS: string | number = process.env.PORT_WS || 3006

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Socket Server
const ws: any = socketio.listen(PORT_WS)
ws.on('connection', (socket: any) => {
    console.log('Client Connected')
    setInterval(() => {
        socket.send('CYCLE')
    }, 25000)
    socket.on('message', (msg: any) => {
        console.log(`Message: ${msg}`)
    })
})

// Routes
import auth from './server/routes/auth'
import game from './server/routes/game'

// Game Cycle
import { gameCycle } from './server/cycle'
setInterval(gameCycle, 60000)

app.use('/user', auth)
app.use('/game', game)

// Add IP for mobile testing
app.listen(PORT, (): void => console.log(`Listening on ${PORT}`))