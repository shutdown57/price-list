import { DataTypes, Model } from 'sequelize'

import { database } from '../models'


export class User extends Model {}
User.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  rules: {
    type: DataTypes.VIRTUAL,
    get () {
      return this.Rules.map(v => v.v1)
    }
  },
  created_at: {
    type: DataTypes.DATE
  },
  updated_at: {
    type: DataTypes.DATE
  },
  mobile: {
    type: DataTypes.STRING
  }
}, {
  sequelize: database,
  timestamps: false,
  tableName: 'users'
})
