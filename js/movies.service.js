'use strict'

const GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d3d30d2a155bf6cf32f380b6425e5c79'
const GENRES_KEY = 'genres_option'
const MOVIES_KEY = 'movies_option'

function getGenres(cb) {
    const genres = loadFromStorage(GENRES_KEY)
    if (genres) {
        cb(genres)
        return
    }
    let xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if (xhr.status === 200) {
            const genres = JSON.parse(xhr.responseText).genres
            saveToStorage(GENRES_KEY, genres)
            cb(genres)
        }
    }
    xhr.open('GET', GENRES_URL)
    xhr.send()
}

function getMovies(genreId, cb) {
    const genre = getGenreById(genreId)
    const movies = loadFromStorage(MOVIES_KEY) || {}
    if (movies[genre.name]) {
        cb(movies[genre.name])
        return
    }

    let xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText)
            const moviesData = getPrepareData(res)
            movies[genre.name] = moviesData
            saveToStorage(MOVIES_KEY, movies)
            cb(moviesData)
        }
    }
    xhr.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=d3d30d2a155bf6cf32f380b6425e5c79&with_genres=${genre.id}`)
    xhr.send()
}

function getPrepareData({results}) {
    return results.map((movie) => {
        return {
            title: movie.title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path
        }
    })
}

function getGenreById(genreId) {
    const genres = loadFromStorage(GENRES_KEY)
    return genres.find(genre => genre.id === genreId)
}