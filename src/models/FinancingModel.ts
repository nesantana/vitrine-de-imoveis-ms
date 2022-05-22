import { DataTypes } from 'sequelize'
import db from '../db'

const Financing = db.define('financing', {
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
  document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price_house: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type_house: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  installment_min: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  installment_max: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

Financing.sync({ alter: true })

export default Financing
