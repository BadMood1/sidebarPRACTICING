"use strict";

const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box");

const loadMoviesBtn = document.querySelector(".loadMovies");

import { handleTop250 } from "./renderMovies.js";
import { throwNotification } from "./notification.js";

loadMoviesBtn.addEventListener("click", () => {
    handleTop250(1).then(() =>
        throwNotification("Уведомление", "Топ 250 кинопоиска загружен успешно!", 2500)
    );
});

const libraryBtn = sidebar.querySelector(".library");
import { renderLibrary } from "./library.js";
libraryBtn.addEventListener("click", renderLibrary);
