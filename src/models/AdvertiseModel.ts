import { DataTypes } from 'sequelize'
import db from '../db'

const Advertise = db.define('advertise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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
  observation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

Advertise.sync({ alter: true })

export default Advertise
