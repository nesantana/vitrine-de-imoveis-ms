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

const app = express()
const server = http.createServer(app)

app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
)
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
)

app.use(express.json())
app.use('/uploads', express.static('../uploads'))

app.use('/users', UsersRoutes)
app.use('/properties', PropertiesRoutes)
app.use('/characteristics', CharacteristicsRoutes)
app.use('/contacts', ContactsRoutes)
app.use('/utils', UtilsRoutes)
app.use('/verificar-email', KeepRegisterRoutes)
app.use('/advertise', AdvertiseRoutes)
app.use('/financing', FinancingRoutes)

server.listen(21291, () => {
  console.log('App Rodando: http://localhost:21291')
})

export { http }
