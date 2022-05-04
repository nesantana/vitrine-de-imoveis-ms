import { DataTypes } from 'sequelize'
import db from '../db'

const Contacts = db.define('contacts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title_propertie: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_properties: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_professional: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  read: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

Contacts.sync({ alter: true })

export default Contacts
