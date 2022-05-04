import { DataTypes } from 'sequelize'
import db from '../db'

const Characteristics = db.define('characteristics', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

Characteristics.sync({ alter: true })

export default Characteristics
