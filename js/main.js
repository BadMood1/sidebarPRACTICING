"use strict";

const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".mode"),
    modeSwitchBtn = modeSwitch.querySelector(".switch"),
    modeText = modeSwitch.querySelector(".mode-text");

export const moviesSection = document.querySelector("section.movies-section");

checkDarkMode();

//
modeSwitchBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    checkDarkMode();
});

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

//
function checkDarkMode() {
    if (body.classList.contains("dark")) {
        modeText.innerText = "Night Mode";
    } else {
        modeText.innerText = "Light Mode";
    }
}

const loadMoviesBtn = document.querySelector(".loadMovies");

import { handleTop250 } from "./renderMovies.js";

loadMoviesBtn.addEventListener("click", () => handleTop250(1));

const libraryBtn = sidebar.querySelector(".library");
import { renderLibrary } from "./library.js";
libraryBtn.addEventListener("click", renderLibrary);
