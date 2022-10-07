import * as dotenv from 'dotenv'
// import 'regenerator-runtime/runtime'

import { Application } from 'express'
import express from 'express'
import { Server } from 'http'
import http from 'http'
import { Server as IOServer } from 'socket.io'
import { v4 as uuid4 } from 'uuid'

import { database } from './models'
import VendorRouter from './routes/vendor.route'
import PriceListRouter from './routes/priceList.route'
import PriceListDetailRouter from './routes/priceListDetail.route'


// Read env file
dotenv.config()

try {
  (async () => {
    await database.authenticate()
    await database.sync({ alter: { drop: true } })
  })()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

const app: Application = express()

app.use(express.json())
const server: Server = http.createServer(app)
const io = new IOServer(server, {
  cors: {
    origin: '*'
  }
})

io.engine.generateId = () => {
  return uuid4()
}

// Routes
app.use('/vendor', VendorRouter)
app.use('/price-list', PriceListRouter)
app.use('/price-list-detail', PriceListDetailRouter)

const port: number | undefined = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000

server.listen(port, () => {
  console.log(`Listen on *:${port}`)
})
