const Movie = require('../models/Movie')
const Genre = require('../models/Genre')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const movies = await Movie.find();
    movies.forEach(
      async function (newMovie) {
        let genreArr = []
        await Genre.find( { "_id": { $in: newMovie.genre_ids }  } ).lean().exec(function (err, docs) {
          genreArr = docs;
        });
        newMovie.genre_ids = genreArr;
      }
    )

    res.status(200).json(movies)
  } catch (e) {
    errorHandler(res, e)
  }
}