const NotifContainer = document.querySelector(".notifications-container");
const MAX_NOTIFICATIONS = 4;

// Обработчик закрытия уведомлений по клику на [X] на весь блок уведомлений
NotifContainer.addEventListener("click", (event) => {
    if (!event.target.classList.contains("notif-cancel")) return;
    const cancelBtn = event.target;

    const notifForDelete = cancelBtn.closest(".notification");

    closeNotification(notifForDelete);
});

// Создание нового уведомления
export function createNotification() {
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
    if (NotifContainer.children.length > MAX_NOTIFICATIONS) NotifContainer.firstElementChild.remove();

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
