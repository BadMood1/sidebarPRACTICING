"use strict";

const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".mode"),
    modeSwitchBtn = modeSwitch.querySelector(".switch"),
    modeText = modeSwitch.querySelector(".mode-text");

const testNotifBtn = document.querySelector(".testNotif"),
    NotifContainer = document.querySelector(".notifications-container");

const MAX_NOTIFICATIONS = 4;
let lastDeletedElLog;
checkDarkMode();
//

modeSwitchBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    checkDarkMode();
});

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

testNotifBtn.addEventListener("click", () => {
    createNotification();
});

// Обработчик закрытия уведомлений по клику на [X]
NotifContainer.addEventListener("click", (event) => {
    if (!event.target.classList.contains("notif-cancel")) return;
    const cancelBtn = event.target;

    const notifForDelete = cancelBtn.closest(".notification");

    closeNotification(notifForDelete);
});

//
function checkDarkMode() {
    if (body.classList.contains("dark")) {
        modeText.innerText = "Night Mode";
    } else {
        modeText.innerText = "Light Mode";
    }
}

// Создание нового уведомления
function createNotification() {
    const notifHtml = `  <div class="notification">
                <div class="notif-content">
                    <span class="notif-title">Успех!</span>
                    <p class="notif-text">${Math.random()}</p>
                    <span class="notif-cancel">[X]</span>
                </div>
            </div>`;

    NotifContainer.insertAdjacentHTML("beforeend", notifHtml);

    const notifEl = NotifContainer.lastChild;

    console.log(NotifContainer.children.length);
    if (NotifContainer.children.length >= 5) NotifContainer.firstElementChild.remove();

    // Анимация появления
    setTimeout(() => {
        notifEl.classList.add("show");
    }, 10);

    setTimeout(() => {
        fadeNotification(notifEl);
    }, 5000);
}
// Функция закрытия с анимацией
function closeNotification(notification) {
    // Убираем класс, а потом как только отработает анимация, то удаляем все ненужные
    notification.classList.remove("show");
    notification.addEventListener("transitionend", () => {
        notification.remove();
    });
}
// Функция плавного исчезновения увед.
function fadeNotification(notification) {
    notification.classList.add("fade");

    notification.addEventListener("animationend", () => {
        notification.remove();
    });
}

async function getTop250() {
    // fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1", {
    //     method: "GET",
    //     headers: {
    //         "X-API-KEY": "e8506cf6-b39e-428c-b791-818e964966f4",
    //         "Content-Type": "application/json",
    //     },
    // })
    //     .then((res) => res.json())
    //     .then((json) => {
    //         return json;
    //     })
    //     .catch((err) => console.log(err));

    const response = await fetch(
        "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1",
        {
            method: "GET",
            headers: {
                "X-API-KEY": "e8506cf6-b39e-428c-b791-818e964966f4",
                "Content-Type": "application/json",
            },
        }
    );
    const json = await response.json();
    return json;
}

function parseGenres(genres) {
    const genresStr = [];
    const genresLength = 3;
    genres.forEach((obj) => {
        genresStr.push(obj.genre);
    });

    return genresStr.slice(0, genresLength).join(", ");
}

function truncDescription(description) {
    const maxLength = 200;
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
}

const loadMoviesBtn = document.querySelector(".loadMovies");
const moviesSection = document.querySelector("section.movies-section");

loadMoviesBtn.addEventListener("click", async (event) => {
    console.log("Loading movies...");
    const moviesJSON = await getTop250();
    console.log(moviesJSON);
    const moviesArr = moviesJSON.items;

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
        };

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

        const movieDescrEl = movieCard.querySelector(".movie-description");
        const minimizeBtn = movieCard.querySelector(".minimize-button");
        console.log(minimizeBtn);

        movieDescrEl.addEventListener("click", (e) => {
            console.log(movieDescrEl.classList);

            // Если выделяем текст, то у нас не сбрасывается выделение
            const selection = window.getSelection();
            if (selection.toString().length > 0) return;

            // Разворачиваем
            if (!movieDescrEl.classList.contains("expanded")) {
                movieDescrEl.classList.add("expanded");
                movieDescrEl.innerText = movieObj.description;
                minimizeBtn.innerText = "Свернуть";
                return;
            }
        });
        minimizeBtn.addEventListener("click", () => {
            movieDescrEl.classList.remove("expanded");
            movieDescrEl.innerText = truncatedDescr;
            minimizeBtn.innerText = "";
            console.log(movieDescrEl);
        });
    });
});
