const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const app = express()
module.exports = app

const createApp = () => {
// body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '../..', 'public')))

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

createApp()
