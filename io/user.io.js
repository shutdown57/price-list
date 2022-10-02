import UserMiddleware from '../user.middleware'


export default function (io) {
  io.of('/user')
    .use(UserMiddleware)
    .on('connection', (socket) => {
      console.info(`USER CONNECTED ID: ${socket.user.id}`)
      socket.broadcast.emit('user:connected', {
        user_id: socket.user.id,
        id: socket.id
      })

      socket.on('users', (msg) => {
        console.log(msg)
      })
    })
}
