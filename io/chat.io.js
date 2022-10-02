import UserMiddleware from '../user.middleware'
import ChatService from '../services/chat.service'


export default function (io) {
  io.of('/chat')
    .use(UserMiddleware)
    .on('connection', async (socket) => {
      const chats = await new ChatService().all(socket.user.id)
      console.log(chats)
      socket.to(socket.id).emit('chat:all', chats)
      socket.on('chat:message', (evt) => {
        // STORE message in database
        socket.to(evt.to).emit('chat:message', {
          from: evt.from,
          message: evt.message
        })
      })
    })
}
