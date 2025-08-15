import { handleDescr, handleMinimizeBtn, truncDescription } from "./description.js";
import { moviesSection } from "./main.js";
import { renderPagination } from "./pagination.js";
import { throwNotification } from "./notification.js";
import { libraryContainsID } from "./library.js";
let currentPage = 1;

export const pageMovieMap = new Map();

async function renderMovies(moviesJSON) {
    console.log("Loading movies...");

    const moviesArr = moviesJSON.items;
    const totalPages = moviesJSON.totalPages;

    moviesArr.forEach((data) => {
        const movieObj = {
            id: data.kinopoiskId,
            nameRu: data.nameRu,
            nameOrig: data.nameOriginal,
            img: data.posterUrl,
            description: data.description,
            genres: parseGenres(data.genres),
            rating: data.ratingKinopoisk,
            year: data.year,
            isAddedToLibrary: libraryContainsID(data.kinopoiskId),
        };

        pageMovieMap.set(movieObj.id, movieObj);

        const truncatedDescr = truncDescription(data.description);

        const movieHTML = `<div class="movie-card" id="${movieObj.id}">
        <img
        src="${movieObj.img}"
        alt="Movie ${movieObj.id} image"
        />
        <div class="movie-info">
        <h3 class="movie-title">${movieObj.nameRu}</h3>
        <p class="movie-second-info">${movieObj.nameOrig}, ${movieObj.year}</p>
        <p class="movie-description">${truncatedDescr}\n</p>
        <span class="minimize-button"></span>
        <p class="movie-genres">Жанры: ${movieObj.genres}</p>
        <p class="movie-rating">Рейтинг: ${movieObj.rating}</p>
        </div>
        <nav class="movie-nav">
        <a class="add-to-library">Добавить</a>
        <a
        href="https://www.kinopoisk.ru/film/${movieObj.id}/"
        class="go-to-kinopoisk"
        target="_blank"
        >Кинопоиск</a
        >
        </nav>
        
        </div>`;

        moviesSection.insertAdjacentHTML("beforeend", movieHTML);

        const movieCard = moviesSection.querySelector(`[id="${movieObj.id}"]`);
        const addToLibraryBtn = movieCard.querySelector(".add-to-library");
        if (movieObj.isAddedToLibrary) addToLibraryBtn.textContent = "В библиотеке";
        const movieDescrEl = movieCard.querySelector(".movie-description");
        const minimizeBtn = movieCard.querySelector(".minimize-button");

        // Логика описания карточек
        movieDescrEl.addEventListener("click", () => handleDescr(movieObj));
        minimizeBtn.addEventListener("click", () => handleMinimizeBtn(movieObj));
    });
    console.log(pageMovieMap);

    return totalPages;
}

function parseGenres(genres) {
    const genresStr = [];
    const genresLength = 3;
    genres.forEach((obj) => {
        genresStr.push(obj.genre);
    });

    return genresStr.slice(0, genresLength).join(", ");
}

export async function handleTop250(page) {
    let currentPage = page;
    console.log("Handling...");

    const response = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=${page}`,
        {
            method: "GET",
            headers: {
                "X-API-KEY": "e8506cf6-b39e-428c-b791-818e964966f4",
                "Content-Type": "application/json",
            },
        }
    );
    const json = await response.json();

    // Очищаем перед новым рендером
    clearMovieSection();
    // Рендер
    const pages = await renderMovies(json);
    throwNotification("Уведомление", "Топ 250 кинопоиска загружен успешно!", 2500);
    renderPagination(pages, handleTop250, currentPage);
}

export function clearMovieSection() {
    moviesSection.innerHTML = "";
    window.scrollTo(0, 0);
}
