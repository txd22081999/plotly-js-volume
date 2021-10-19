// import Plotly from 'plotly.js-dist-min'
const express = require('express')
const cors = require('cors')
const { router } = require('./router')
// import { router } from './router'

const PORT = 7000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/pages'))

app.set('view engine', 'ejs')

app.use(router)

app.listen(PORT, () => {
  console.log('Server in running on port', PORT)
})
