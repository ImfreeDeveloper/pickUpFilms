const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
  id: Number,
  name: String,
})

module.exports = mongoose.model('genres', genreSchema)