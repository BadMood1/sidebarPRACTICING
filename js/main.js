"use strict";

const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".mode"),
    modeSwitchBtn = modeSwitch.querySelector(".switch"),
    modeText = modeSwitch.querySelector(".mode-text");

const testNotifBtn = document.querySelector(".testNotif");
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

import { createNotification } from "./notification.js";

testNotifBtn.addEventListener("click", createNotification);

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

loadMoviesBtn.addEventListener("click", handleTop250);
