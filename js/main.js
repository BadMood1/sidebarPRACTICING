"use strict";

const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box");

import { handleTop250 } from "./renderMovies.js";
import { throwNotification } from "./notification.js";
import { showUserPanel } from "./userPanel.js";
import { renderLibrary } from "./library.js";

// DEFAULT load

// showUserPanel("main");

//

const mainPageBtn = sidebar.querySelector(".main-page");
console.log(mainPageBtn);
mainPageBtn.addEventListener("click", () => {
    showUserPanel("main");
    handleTop250(1).then(() =>
        throwNotification("Уведомление", "Топ 250 кинопоиска загружен успешно!", 2500)
    );
});

const libraryBtn = sidebar.querySelector(".library-page");
libraryBtn.addEventListener("click", () => {
    showUserPanel("library");
    renderLibrary();
});
