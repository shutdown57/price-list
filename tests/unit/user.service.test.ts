import * as dotenv from 'dotenv'
import { Error } from 'sequelize'

dotenv.config({ path: '.env.test', override: true })

import { User } from '../../models/user.model'
import UserService from '../../services/user.service'
import { database } from '../../models'

beforeAll(async () => {
  dotenv.config({ path: '.env.test', override: true })
  database.addModels([User])
  await database.sync()
})
// afterAll(async () => {
//   await Vendor.drop()
// })
// beforeEach(() => console.log('1 - beforeEach'))
// afterEach(() => console.log('1 - afterEach'))

class UserNotFound extends Error { }

describe('User service', () => {
  describe('User get', () => {
    it('Should get a user by user id', async () => {
      const userService = new UserService()
      const userId: string = '3c5e1d3f-18e2-43ca-8dea-25e249e34e5d'
      const userName: string = 'آزاده فتاحی'
      const user = await userService.byId(userId)
      if (!user) {
        throw new UserNotFound('User not found')
      }

      const data = user.toJSON()
      expect(data.id).toEqual(userId)
      expect(data.name).toEqual(userName)
    })
  })
})
