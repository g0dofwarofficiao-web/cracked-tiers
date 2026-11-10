document.addEventListener("DOMContentLoaded", function () {

const categoryButtons = document.querySelectorAll(".category-tab");
const categoryTitle = document.getElementById("categoryTitle");
const tierListTitle = document.getElementById("tierListTitle");

// Get category from the URL
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");

// Select and display a category
function selectCategory(category) {

    categoryButtons.forEach(function (button) {

        const buttonCategory = button.getAttribute("data-category");

        // Remove active status from every button
        button.classList.remove("active");

        // Activate the selected category
        if (buttonCategory === category) {
            button.classList.add("active");
        }
    });

    // Update page titles
    if (categoryTitle && category) {
        categoryTitle.textContent =
            category.toUpperCase() + " RANKINGS";
    }

    if (tierListTitle && category) {
        tierListTitle.textContent =
            category.toUpperCase() + " TIERS";
    }
}

// Select category from homepage URL
if (selectedCategory && categoryButtons.length > 0) {
    selectCategory(selectedCategory);
}

// Category button clicks
categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const category = button.getAttribute("data-category");

        selectCategory(category);

        // Update the URL without reloading
        const newUrl =
            "rankings.html?category=" +
            encodeURIComponent(category);

        window.history.replaceState({}, "", newUrl);
    });
});

});