document.addEventListener("DOMContentLoaded", () => {

// Get all category buttons
const categoryButtons = document.querySelectorAll(".category-tab");

const categoryTitle = document.getElementById("categoryTitle");
const tierListTitle = document.getElementById("tierListTitle");

// Run only on the Rankings page
if (categoryButtons.length > 0) {

    categoryButtons.forEach((button) => {

        button.addEventListener("click", () => {

            // Remove the active style from every button
            categoryButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            // Make the clicked button active
            button.classList.add("active");

            // Get the category name
            const category = button.dataset.category;

            // Update the page titles
            categoryTitle.textContent =
                category.toUpperCase() + " RANKINGS";

            tierListTitle.textContent =
                category.toUpperCase() + " TIERS";

            // For now, sample data stays the same.
            // Later, Supabase will load real rankings here.
        });

    });

}

});