import { DataTypes } from 'sequelize'
import db from '../db'

const Users = db.define('users', {
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
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  complement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  professional_document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instagram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  youtube: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  access: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '0',
  },
  last_payment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_admin: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '0',
  },
})

Users.sync({ alter: true })

export default Users
