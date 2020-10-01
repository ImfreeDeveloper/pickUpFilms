const Movie = require('../models/Movie')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const movies = await Movie.find().populate('genre_ids').limit(10);
    res.status(200).json(movies)
  } catch (e) {
    errorHandler(res, e)
  }
}