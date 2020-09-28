const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = 'f9098d7c06a78183bc5b2f5380bba4ca'
let paramsObj = {
  'api_key': API_KEY,
  'language': 'ru-RU',
  'include_adult': 'false',
  'release_date.gte': '2000-01-01'
}
let dataMovies = []

async function getMovies() {
  try {
    let moviesFirstPageResp = await axios.get('https://api.themoviedb.org/3/discover/movie', { params: paramsObj })
    let moviesFirstPageData = moviesFirstPageResp.data
    let moviesFirstPageDataResults = moviesFirstPageData.results
    // let totalPage = moviesFirstPageData.total_pages
    let totalPage = 10

    console.log(`page 1 из ${totalPage}`);

    dataMovies.push(...moviesFirstPageDataResults)
    // Сохраняем картинки
    await saveImages(moviesFirstPageDataResults)

    for (let i = 2; i <= totalPage; i++) {
      paramsObj['page'] = i
      let moviesResp = await axios.get('https://api.themoviedb.org/3/discover/movie', { params: paramsObj })
      let moviesResults = moviesResp.data.results
      dataMovies.push(...moviesResults)
      // Сохраняем картинки
      await saveImages(moviesResults)
      console.log(`page ${i} из ${totalPage}`);
    }
    // Запись в json
    let dataMoviesJson = JSON.stringify(dataMovies, null, 2);
    fs.writeFile('dataMovies.json', dataMoviesJson, (err) => {
      if (err) throw err;
      console.log('Все хорошо!');
    });
  } catch (error) {
    console.log(error);
  }
}

async function getGenres() {
  let paramsObj = {
    'api_key': API_KEY,
    'language': 'ru-RU'
  }
  try {
    let genresResp = await axios.get('https://api.themoviedb.org/3/genre/movie/list', { params: paramsObj })
    let genresData = genresResp.data.genres

    console.log(genresData);

    // Запись в json
    let dataGenresJson = JSON.stringify(genresData, null, 2);
    fs.writeFile('dataGenres.json', dataGenresJson, (err) => {
      if (err) throw err;
      console.log('Все хорошо!');
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveImages(movies) {
  const url = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'
  try {
    for (let i = 0; i < movies.length; i++) {
      let imagesResp = await axios.get(`${url}${movies[i].poster_path}`, {responseType: "stream"})
      imagesResp.data.pipe(fs.createWriteStream(`img${movies[i].poster_path}`));
    }
  } catch (error) {
    console.log(`Ошибка сохранения картинки: ${error}`);
  }
}

getMovies()
