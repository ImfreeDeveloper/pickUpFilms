const Movie = require('../models/Movie')
const Genre = require('../models/Genre')
const errorHandler = require('../utils/errorHandler')
// Для Импорта в бд
const dataGenre = require('../utils/parser/dataGenres.json')
const dataMovie = require('../utils/parser/dataMovies.json')
// Жанры
module.exports.createGenres = async function (req, res) {
  try {
    for (let i = 0; i < dataGenre.length; i++) {
      const element = dataGenre[i];
      const genre = Genre({
        id: element.id,
        name: element.name
      })
      await genre.save()
    }
    res.status(200).json({success: true})
  } catch (e) {
    errorHandler(res, e)
  }
}
// Фильмы
module.exports.createMovies = async function (req, res) {
  try {
    for (let i = 0; i < dataMovie.length; i++) {
      const element = dataMovie[i];
      let genresArr = []
      await Genre.find({ id: { $in: element.genre_ids }}, function (err, genres) {
        if (err) return console.log(err);
        genres.forEach(genre => {
          genresArr.push(genre._id)
        })
      });
      const movie = Movie({
        id: element.id,
        popularity: element.popularity,
        video: element.video,
        vote_count: element.vote_count,
        vote_average: element.vote_average,
        title: element.title,
        release_date: element.release_date,
        original_language: element.original_language,
        original_title: element.original_title,
        genre_ids: genresArr,
        backdrop_path: element.backdrop_path,
        backdrop_path: element.backdrop_path,
        overview: element.overview,
        poster_path: element.poster_path,
      })
      await movie.save()
    }
    res.status(200).json({success: true})
  } catch (e) {
    errorHandler(res, e)
  }
}