import { Redis } from 'ioredis'


class BaseRedis {
  #option = {
    port: process.env.REDIS_PORT_NUMBER,
    host: process.env.REDIS_HOST,
    username: '',
    password: process.env.REDIS_PASSWORD,
    db: 0
  }

  constructor () {
    this.__client = new Redis({ ...this.#option })
  }

  client () {
    return this.__client
  }
}


export default class extends BaseRedis {
  constructor () {
    super()
  }
}
