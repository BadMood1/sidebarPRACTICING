import { pageMovieMap, showOnlySection } from "./renderMovies.js";
import { handleDescr, handleMinimizeBtn, truncDescription } from "./description.js";

const mainPage = document.querySelector(".home");

export let libraryMovies = [];
if (localStorage.getItem("libraryMovies")) {
    libraryMovies = JSON.parse(decodeURIComponent(localStorage.getItem("libraryMovies")));
    console.log("Library:", libraryMovies);
}

mainPage.addEventListener("click", (event) => {
    const addBtn = event.target.closest(".add-to-library");
    if (!addBtn) return;
    const movieCard = addBtn.closest(".movie-card");
    const id = Number(movieCard.id);

    // Если уже в библиотеке
    if (libraryContainsID(id)) {
        // Удаляем объект по айди
        const index = libraryMovies.findIndex((movie) => movie.id === id);
        console.log(index);
        libraryMovies.splice(index, 1);
        addBtn.textContent = "Удалено";

        // Если действие внутри библиотеки
        const librarySection = addBtn.closest(".library-section");
        if (librarySection) {
            movieCard.remove();
            isLibraryEmpty(librarySection);
        }

        localStorage.setItem("libraryMovies", encodeURIComponent(JSON.stringify(libraryMovies)));
        return;
    }

    // Добавляем в библиотеку
    const movieFromMap = pageMovieMap.get(id);
    if (movieFromMap) {
        movieFromMap.isAddedToLibrary = true;
        libraryMovies.push(movieFromMap);
        console.log(movieFromMap);
        addBtn.textContent = "В библиотеке";
    }

    localStorage.setItem("libraryMovies", encodeURIComponent(JSON.stringify(libraryMovies)));
});

export function libraryContainsID(id) {
    if (libraryMovies.find((movie) => movie.id === id)) return true;
    else return false;
}

export function renderLibrary() {
    showOnlySection("library-section");
    const librarySection = document.querySelector(".library-section");

    const paginationOld = document.querySelector(".pagination-container");
    if (paginationOld) paginationOld.remove();

    // Если библиотека пуста, то показываем это и НЕ рендерим
    if (isLibraryEmpty(librarySection)) return;

    libraryMovies.forEach((movieObj) => {
        const truncatedDescr = truncDescription(movieObj.description);

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

        librarySection.insertAdjacentHTML("beforeend", movieHTML);

        const movieCard = librarySection.querySelector(`[id="${movieObj.id}"]`);
        const addToLibraryBtn = movieCard.querySelector(".add-to-library");
        if (movieObj.isAddedToLibrary) addToLibraryBtn.textContent = "В библиотеке";
        const movieDescrEl = movieCard.querySelector(".movie-description");
        const minimizeBtn = movieCard.querySelector(".minimize-button");

        // Логика описания карточек
        movieDescrEl.addEventListener("click", () => handleDescr(movieObj));
        minimizeBtn.addEventListener("click", () => handleMinimizeBtn(movieObj));
    });
}

export function isLibraryEmpty(librarySection) {
    if (libraryMovies.length === 0 && !librarySection.hasChildNodes()) {
        console.log(librarySection.hasChildNodes());
        const emptyLibraryHTML = '<div class="empty-library">Библиотека пуста</div>';
        librarySection.insertAdjacentHTML("afterbegin", emptyLibraryHTML);
        return true;
    }
    return false;
}
