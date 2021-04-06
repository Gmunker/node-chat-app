const socket = io()
const $messageForm = document.querySelector('#form1')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('welcomeMessage', (message) => {
  console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  $messageFormButton.setAttribute('disabled', 'disabled')
  const message = e.target.elements.form1_input.value
  socket.emit('messageSend', message, (err) => {
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
    if (err) {
      return console.log(err)
    }

    console.log('Message Delivered!')
  })
})

socket.on('messageRecieved', (message) => {
  console.log(message)
  const html = Mustache.render(messageTemplate, {
    message
  })
  $messages.insertAdjacentHTML('beforeend', html)
})

$sendLocationButton.addEventListener('click', () => {
  $sendLocationButton.setAttribute('disabled', 'disabled')
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition((pos) => {
    socket.emit('sendLocation', {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }, () => {
      $sendLocationButton.removeAttribute('disabled')
      console.log("Location Shared!")
    })
  })
})
