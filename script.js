document.addEventListener("DOMContentLoaded", function () {

const categoryButtons = document.querySelectorAll(".category-tab");
const categoryTitle = document.getElementById("categoryTitle");
const tierListTitle = document.getElementById("tierListTitle");

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active status from all buttons
        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Make the clicked category active
        button.classList.add("active");

        // Get category name
        const category = button.getAttribute("data-category");

        // Change titles
        if (categoryTitle) {
            categoryTitle.textContent = category.toUpperCase() + " RANKINGS";
        }

        if (tierListTitle) {
            tierListTitle.textContent = category.toUpperCase() + " TIERS";
        }

    });

});

});