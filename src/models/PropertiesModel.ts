import { DataTypes } from 'sequelize'
import db from '../db'

const Properties = db.define('properties', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_professional: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  area_build: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bedrooms: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bathrooms: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coordinates: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  informations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  characteristics: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photos: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  views: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  suite: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  youtube: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  iptu: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

Properties.sync({ alter: true })

export default Properties
