import { Sequelize } from 'sequelize-typescript'
import { Category } from './category.model'

import { PriceList } from './priceList.model'
import { PriceListDetail } from './priceListDetail.model'
import { Product } from './product.model'
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
    // charset: 'utf8mb4'
  },
  logging
})

database.addModels([
  Rule,
  User,
  Vendor,
  PriceList,
  Category,
  Product,
  PriceListDetail
])
