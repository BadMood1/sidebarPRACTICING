"use strict";

import { moviesSection } from "./main.js";

const paginationElTEST = document.querySelector(".pagination-container nav");
let currentPage = 1;

const paginationHTML = `<div class="pagination-container">
                <nav class="pagination">
                    <i class="back-page bxr bx-arrow-left-stroke"></i>
                    <i class="next-page bxr bx-arrow-right-stroke"></i>
                </nav>
            </div>`;

function renderPagination() {
    let pagination = getPagination(currentPage, 13);

    pagination.forEach((text) => {
        console.log(text);
        const renderingPageBtn = document.createElement("a");
        renderingPageBtn.textContent = text;
        paginationElTEST.insertAdjacentElement("beforeend", renderingPageBtn);
    });
}

function getPagination(currentPage = 1, totalPages = 20, delta = 2) {
    let pagesNums = [];
    const left = currentPage - delta;
    let right = currentPage + delta;

    pagesNums.push(1, totalPages);
    // Случай первых страниц
    if (currentPage <= 2) right += 2;
    // Случай последних страниц

    // Общий случай
    for (let i = left; i <= right; i++) {
        if (pagesNums.includes(i) || i < 1 || i > totalPages) continue;
        pagesNums.push(i);
    }

    pagesNums.sort((a, b) => a - b);

    let pagination = [];

    for (let i = 0; i < pagesNums.length; i++) {
        pagination.push(pagesNums[i]);
        if (pagesNums[i + 1] && pagesNums[i + 1] - pagesNums[i] > 1) pagination.push("...");
    }

    return pagination;
}

renderPagination();
