import { DataTypes } from 'sequelize'
import db from '../db'

const Customers = db.define('customers', {
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
    primaryKey: true,
  },
})

Customers.sync({ alter: true })

export default Customers
