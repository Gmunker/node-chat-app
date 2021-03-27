const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

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

  socket.on('messageSend', (message) => {
    io.emit('messageRecieved', message)
  })

  socket.on('disconnect', () => {
    io.emit('messageRecieved', "User has disconnected")
  })

  socket.on('sendLocation', (loc) => {
    io.emit('messageRecieved', `https://www.google.com/maps?q=${loc.lat},${loc.lon}`)
  })
})

server.listen(port, () => {
  console.log(`Port is listening on ${port}`)
})
