import * as dotenv from 'dotenv'
// import 'regenerator-runtime/runtime'

import { Express } from 'express'
import express from 'express'
import { Server } from 'http'
import http from 'http'
import { Server as IOServer } from 'socket.io'
import { v4 as uuid4 } from 'uuid'

import { database } from './models'
import VendorRouter from './routes/vendor.route'
// import MainRoute from './routes/main.route'
// import UserIO from './io/user.io'
// import ChatIO from './io/chat.io'


// Read env file
dotenv.config()

try {
  (async () => {
    await database.authenticate()
    await database.sync()
  })()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

const app: Express = express()
const server: Server = http.createServer(app)
const io = new IOServer(server, {
  cors: {
    origin: '*'
  }
})

io.engine.generateId = () => {
  return uuid4()
}

// UserIO(io)
// ChatIO(io)

// Routes
app.use('/vendor', VendorRouter)

const port: number | undefined = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000

server.listen(port, () => {
  console.log(`Listen on *:${port}`)
})
