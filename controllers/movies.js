const Movie = require('../models/Movie')
const Genre = require('../models/Genre')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    // const genres = Genre.find({});
    const movies = await Movie.find().limit(10).skip(0)
    res.status(200).json(movies)
  } catch (e) {
    errorHandler(res, e)
  }
}