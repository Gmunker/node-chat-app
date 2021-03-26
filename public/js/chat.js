const socket = io()

socket.on('welcomeMessage', (message) => {
  console.log(message)
})

const form1_button = document.querySelector('#form1')


form1_button.addEventListener('submit', (e) => {
  e.preventDefault()

  const form1_input = document.querySelector('input[name="form1_input"]')
  socket.emit('messageSend', form1_input.value)
})

socket.on('messageRecieved', (message) => {
  console.log(message)
})
