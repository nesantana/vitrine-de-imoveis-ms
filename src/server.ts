import express from 'express'
import http from 'http'

import UsersRoutes from '@routes/UsersRoutes'
import PropertiesRoutes from '@routes/PropertiesRoutes'
import CharacteristicsRoutes from '@routes/CharacteristicsRoutes'
import ContactsRoutes from '@routes/ContactsRoutes'

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

app.use('/users', UsersRoutes)
app.use('/properties', PropertiesRoutes)
app.use('/characteristics', CharacteristicsRoutes)
app.use('/contacts', ContactsRoutes)

server.listen(21291, () => {
  console.log('App Rodando: http://localhost:21291')
})

export { http }
