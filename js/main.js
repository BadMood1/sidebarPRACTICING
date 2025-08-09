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

function fadeNotification(notification) {
    notification.classList.add("fade");

    notification.addEventListener("animationend", () => {
        notification.remove();
    });
}

async function testFetch() {
    fetch("https://api.kinopoisk.dev/v1.3/movie?page=1&limit=50&lists=top250", {
        headers: {
            "X-API-KEY": "B71AS27-Q9CMCW8-HXMVCB7-2K8AWZB", // Получить тут: https://kinopoiskapiunofficial.tech
        },
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
}
