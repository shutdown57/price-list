import JWT from './config/jwt.config'
import UserService from './services/user.service'

export default async function (socket, next) {
  const token = socket.handshake.auth.token
  if (!token) {
    return next(new Error('Authorization need a token'))
  }
  const jwt = new JWT()
  const payload = jwt.decode(token)
  const user = await new UserService().byId(payload.sub)
  socket.id = user.id
  socket.user = user
  next()
}
