const sidebar = document.querySelector("nav.sidebar"),
    body = document.body,
    sidebarToggle = document.querySelector(".sidebar .toggle"),
    modeSwitch = body.querySelector(".mode"),
    modeText = modeSwitch.querySelector(".mode-text"),
    modeSwitchBtn = modeSwitch.querySelector(".switch"),
    blurBehind = document.querySelector(".blur");

checkDarkMode();

// Смена темы
modeSwitchBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    checkDarkMode();
});

// Убрать сайдбар
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Фон
sidebarToggle.addEventListener("click", () => {
    if (sidebar.classList.contains("close")) {
        blurBehind.classList.remove("active");
    } else {
        blurBehind.classList.add("active");
    }
});

// Убрать сайдбар по нажатию на фон
blurBehind.addEventListener("click", () => {
    sidebar.classList.add("close");
    blurBehind.classList.remove("active");
});

//
function checkDarkMode() {
    if (body.classList.contains("dark")) {
        modeText.innerText = "Night Mode";
    } else {
        modeText.innerText = "Light Mode";
    }
}
