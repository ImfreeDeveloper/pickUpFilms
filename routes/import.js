const express = require('express')
const controller = require('../controllers/import')
const router = express.Router()

// Жанры
router.get('/addG', controller.createGenres)
// Фильмы
router.get('/addM', controller.createMovies)

module.exports = router