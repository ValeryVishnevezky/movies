'use strict'

function onInit() {
    getGenres(renderGenres)
}

function renderGenres(genres){
    const elGenres = document.querySelector('.genres-options')
    const strHtmls = genres.map(genre => `
    <button class="genre" onclick="onGenreClick(${genre.id})">${genre.name}</button>
    `)
    elGenres.innerHTML = strHtmls.join('')
}

function onGenreClick(genreId) {
    getMovies(genreId, renderMovies)
}

function renderMovies(movies) {
    const elMovies = document.querySelector('.movies')
    const strHTMLs = movies.map(({ title, overview, backdrop_path }) => `
            <section class="movie">
                <div class="title">${title}</div>
                <img src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="${title}"/>
                <div class="overview">${overview}</div>
            </section>
        `
    )
    elMovies.innerHTML = strHTMLs.join('')
}