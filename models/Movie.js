const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  popularity: Schema.Types.Decimal128,
  id: {
    type: String,
    default: ''
  },
  video: {
    type: String,
  },
  vote_count: {
    type: Number,
  },
  vote_average: {
    type: String,
  },
  title: {
    type: String,
  },
  release_date: {
    type: String,
  },
  original_language: {
    type: String,
  },
  original_title: {
    type: String,
  },
  genre_ids: [Number],
  backdrop_path: {
    type: String,
  },
  backdrop_path: {
    type: String,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
  },
})

module.exports = mongoose.model('movies', movieSchema)