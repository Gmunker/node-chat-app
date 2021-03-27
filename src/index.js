const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
  console.log('New WebSocket Connection')
  socket.emit('welcomeMessage', "Welcome")
  socket.broadcast.emit('messageRecieved', 'New user has joined the chat')

  socket.on('messageSend', (message, callBack) => {
    const filter = new Filter()

    if(filter.isProfane(message)) {
      return callBack('Profanity is not allowed!')
    }

    io.emit('messageRecieved', message)
    callBack()
  })

  socket.on('disconnect', () => {
    io.emit('messageRecieved', "User has disconnected")
  })

  socket.on('sendLocation', (loc, callBack) => {
    io.emit('messageRecieved', `https://www.google.com/maps?q=${loc.lat},${loc.lon}`)
    callBack()
  })
})

server.listen(port, () => {
  console.log(`Port is listening on ${port}`)
})
