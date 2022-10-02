import { DataTypes, Model } from 'sequelize'

import { database } from '../models'

export class Chat extends Model {}
Chat.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false
  },
  users: {
    type: DataTypes.JSON
  },
  deleted_at: {
    type: DataTypes.DATE
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
  tableName: 'chats'
})
