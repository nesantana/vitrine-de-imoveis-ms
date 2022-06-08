import { Credentials } from '@utils/credentials'
import { Sequelize } from 'sequelize'

const connection = new Sequelize(Credentials.db.db, Credentials.db.user, Credentials.db.password, {
  host: Credentials.db.host,
  dialect: Credentials.db.dialect as any,
})

connection.authenticate()
  .then(() => {
    console.log('Conectado com sucesso')
  })
  .catch((error) => {
    console.error(`Problemas ao conectar com o banco de dados: ${error}`)
  })

export default connection
