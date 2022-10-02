// import { Op } from 'sequelize'

import { Chat } from '../models/chat.model'
import { database } from '../models'
// import sequelize from 'sequelize'
// import { Message } from '../models/message.model'


export default class {
  async create (id) {
    const chats = await database.query('SELECT * FROM chats', { model: Chat, mapToModel: true })
    return chats.filter(v => v.users.includes(id))
  }
}
