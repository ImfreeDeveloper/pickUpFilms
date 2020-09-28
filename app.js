const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors') // cors запросы если другой домен
const morgan = require('morgan') // логирование
// роуты
const moviesRoutes = require('./routes/movies')

const keys = require('./config/keys')

const app = express()

// Подключение к БД mongo
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch(err => console.log(err))
mongoose.set('useCreateIndex', true)

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/movies', moviesRoutes)

module.exports = app