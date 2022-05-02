import express from 'express'
import http from 'http'

import defaultRoutes from '@routes/defaultRoutes'
import cors from 'cors'

const app = express()
const server = http.createServer(app)

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/default', defaultRoutes)

server.listen(8800, () => {
  console.log('App Rodando: http://localhost:8800')
})

export { http }
