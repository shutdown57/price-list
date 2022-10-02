import * as jwt from 'jsonwebtoken'

export default class {
  #secret = ''

  constructor () {
    this.#secret = process.env.JWT_SECRET
  }

  encode (data) {
    return jwt.sign(data, this.#secret, { algorithm: 'HS256' })
  }

  decode (token) {
    return jwt.verify(token, this.#secret)
  }
}
