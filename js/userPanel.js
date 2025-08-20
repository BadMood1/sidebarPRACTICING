export function showUserPanel(type) {
    // type: 'main', 'library'

    // Delete OLD user panel (reRender)
    const old = document.querySelector("header.user-panel");
    if (old) old.remove();

    const home = document.querySelector("section.home");

    if (type === "main") {
        const userPanel = `<header class="user-panel">
            <div class="panel-wrapper">
                <button class="loadMovies">Load TOP 250</button>
            </div>  
            <div class="text">Главная</div>
        </header>`;

        home.insertAdjacentHTML("afterbegin", userPanel);
    }

    if (type === "library") {
        const userPanel = `<header class="user-panel">
                <div class="panel-wrapper">
                
                </div>
                <div class="text">Библиотека</div>
            </header>`;

        home.insertAdjacentHTML("afterbegin", userPanel);
    }
}

// showUserPanel("main");
