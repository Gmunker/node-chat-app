const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.listen(port, function(err) {
  if (err) console.log("Error in setup")
  console.log("Listening on 3000")
})
