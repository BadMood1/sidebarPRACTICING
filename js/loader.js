export async function fetchWithLoader(url, options = {}) {
    console.log("LOADING...");

    const loader = document.getElementById("loader");

    if (!loader) {
        console.warn("Лоадер не найден в DOM");
        return fetch(url, options);
    }

    // Show Loader
    loader.style.display = "block";

    // try...catch block so loader don't stay forever
    try {
        const response = await fetch(url, options);

        // HTTP status check
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (err) {
        console.error("Fetch error: ", err);
        throw err; // Чтобы вызывающий код узнал об ошибке
    } finally {
        loader.style.display = "none";
    }
}
