import express from 'express'
import http from 'http'

import UsersRoutes from '@routes/UsersRoutes'
import PropertiesRoutes from '@routes/PropertiesRoutes'
import CharacteristicsRoutes from '@routes/CharacteristicsRoutes'
import ContactsRoutes from '@routes/ContactsRoutes'
import UtilsRoutes from '@routes/UtilsRoutes'
import KeepRegisterRoutes from '@routes/KeepRegisterRoutes'
import AdvertiseRoutes from '@routes/AdvertiseRoutes'
import FinancingRoutes from '@routes/FinancingRoutes'

import cors from 'cors'
import path from 'path'
import { port } from '@utils/credentials'

const app = express()
const server = http.createServer(app)

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use('/users', UsersRoutes)
app.use('/properties', PropertiesRoutes)
app.use('/characteristics', CharacteristicsRoutes)
app.use('/contacts', ContactsRoutes)
app.use('/utils', UtilsRoutes)
app.use('/verificar-email', KeepRegisterRoutes)
app.use('/advertise', AdvertiseRoutes)
app.use('/financing', FinancingRoutes)

server.listen(port, () => {
  console.log('App Rodando: http://localhost:21291')
})

export { http }
