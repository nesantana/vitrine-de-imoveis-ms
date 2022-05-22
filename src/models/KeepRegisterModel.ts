import { DataTypes } from 'sequelize'
import db from '../db'

const KeepRegister = db.define('keep_register', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

KeepRegister.sync({ alter: true })

export default KeepRegister
