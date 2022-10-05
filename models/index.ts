import { Sequelize } from 'sequelize-typescript'

import { Rule } from './rule.model'
import { User } from './user.model'
import { Vendor } from './vendor.model'


const name: string | undefined = process.env.DATABASE_NAME ?? ''
const user: string | undefined = process.env.DATABASE_USER ?? ''
const host: string | undefined = process.env.DATABASE_HOST ?? ''
const port: string | undefined = process.env.DATABASE_PORT ?? ''
const logging: boolean | undefined = process.env.DATABASE_LOGGING === 'true'
const password: string | undefined = process.env.DATABASE_PASSWORD ?? ''

export const database: Sequelize = new Sequelize(name, user, password, {
  dialect: 'mysql',
  dialectOptions: {
    host,
    port
  },
  logging,
})

database.addModels([Rule, User, Vendor])
