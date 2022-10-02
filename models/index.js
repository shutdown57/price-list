import { Sequelize } from 'sequelize'


const name = process.env.DATABASE_NAME
const user = process.env.DATABASE_USER
const host = process.env.DATABASE_HOST
const port = process.env.DATABASE_PORT
const password = process.env.DATABASE_PASSWORD

export const database = new Sequelize(name, user, password, {
  dialect: 'mysql',
  dialectOptions: {
    host,
    port
  }
})
