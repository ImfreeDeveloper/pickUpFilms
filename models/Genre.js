const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
  _id: { type: Number, unique: true },
  name: String,
})

module.exports = mongoose.model('genres', genreSchema)