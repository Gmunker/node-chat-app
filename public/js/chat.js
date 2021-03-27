const socket = io()

socket.on('welcomeMessage', (message) => {
  console.log(message)
})

const form1_button = document.querySelector('#form1')


form1_button.addEventListener('submit', (e) => {
  e.preventDefault()

  const form1_input = e.target.elements.form1_input
  socket.emit('messageSend', form1_input.value)
})

socket.on('messageRecieved', (message) => {
  console.log(message)
})

document.querySelector('#send-location').addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition((pos) => {
    socket.emit('sendLocation', {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    })
  })
})
