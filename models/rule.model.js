import { DataTypes, Model } from 'sequelize'

import { database } from '../models'
import { User } from './user.model'


export class Rule extends Model {}
Rule.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: false
  },
  p_type: {
    type: DataTypes.STRING
  },
  v0: {
    type: DataTypes.STRING
  },
  v1: {
    type: DataTypes.STRING
  },
  v2: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE
  },
  updated_at: {
    type: DataTypes.DATE
  }
}, {
  sequelize: database,
  timestamps: false,
  tableName: 'rules'
})

User.hasMany(Rule, { foreignKey: 'v0', constraints: false })
Rule.belongsTo(User, { foreignKey: 'v0', constraints: false })
