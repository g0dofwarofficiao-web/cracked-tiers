document.addEventListener("DOMContentLoaded", function () {

// ================================
// SUPABASE CONNECTION
// ================================
const SUPABASE_URL = "https://twgnubacplneragssrot.supabase.co";

const SUPABASE_KEY = "PASTE_YOUR_PUBLISHABLE_KEY_HERE";


// ================================
// PAGE ELEMENTS
// ================================
const categoryButtons = document.querySelectorAll(".category-tab");
const categoryTitle = document.getElementById("categoryTitle");
const tierListTitle = document.getElementById("tierListTitle");
const leaderboard = document.querySelector(".ranking-table");
const tierGroups = document.querySelectorAll(".tier-group");


// ================================
// GET CATEGORY FROM URL
// ================================
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category") || "Sword";


// ================================
// LOAD RANKINGS FROM SUPABASE
// ================================
async function loadRankings(category) {

    try {

        const response = await fetch(
            SUPABASE_URL +
            "/rest/v1/rankings?select=player_name,tier&category=eq." +
            encodeURIComponent(category),
            {
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": "Bearer " + SUPABASE_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("Could not load rankings");
        }

        const players = await response.json();

        displayLeaderboard(players);
        displayTierList(players);

    } catch (error) {

        console.error("Ranking loading error:", error);

        // Show an error on the leaderboard
        if (leaderboard) {

            const oldRows = leaderboard.querySelectorAll(
                ".ranking-table-row:not(.table-header)"
            );

            oldRows.forEach(function (row) {
                row.remove();
            });

            const errorRow = document.createElement("div");
            errorRow.className = "ranking-table-row";

            errorRow.innerHTML = `
                <span>!</span>
                <span class="player-name">Unable to load rankings</span>
                <span>!</span>
            `;

            leaderboard.appendChild(errorRow);
        }
    }
}


// ================================
// DISPLAY LEADERBOARD
// ================================
function displayLeaderboard(players) {

    if (!leaderboard) return;

    // Remove old player rows
    const oldRows = leaderboard.querySelectorAll(
        ".ranking-table-row:not(.table-header)"
    );

    oldRows.forEach(function (row) {
        row.remove();
    });


    // No players yet
    if (players.length === 0) {

        const emptyRow = document.createElement("div");
        emptyRow.className = "ranking-table-row";

        emptyRow.innerHTML = `
            <span>-</span>
            <span class="player-name">No players ranked yet</span>
            <span>-</span>
        `;

        leaderboard.appendChild(emptyRow);
        return;
    }


    // Add real players
    players.forEach(function (player, index) {

        const row = document.createElement("div");
        row.className = "ranking-table-row";

        row.innerHTML = `
            <span class="position">${index + 1}</span>
            <span class="player-name">${player.player_name}</span>
            <span class="tier-badge">${player.tier}</span>
        `;

        leaderboard.appendChild(row);
    });
}


// ================================
// DISPLAY TIER LIST
// ================================
function displayTierList(players) {

    tierGroups.forEach(function (group) {

        const tierLabel = group.querySelector(".tier-label");
        const tierPlayers = group.querySelector(".tier-players");

        if (!tierLabel || !tierPlayers) return;

        const tierName = tierLabel.textContent.trim();

        const playersInTier = players.filter(function (player) {
            return player.tier === tierName;
        });


        // Show players in this tier
        if (playersInTier.length === 0) {

            tierPlayers.innerHTML =
                "<span>No players yet</span>";

        } else {

            tierPlayers.innerHTML = playersInTier
                .map(function (player) {
                    return "<span>" + player.player_name + "</span>";
                })
                .join("");
        }
    });
}


// ================================
// SELECT CATEGORY
// ================================
function selectCategory(category) {

    categoryButtons.forEach(function (button) {

        const buttonCategory =
            button.getAttribute("data-category");

        button.classList.remove("active");

        if (buttonCategory === category) {
            button.classList.add("active");
        }
    });


    // Update page titles
    if (categoryTitle) {
        categoryTitle.textContent =
            category.toUpperCase() + " RANKINGS";
    }

    if (tierListTitle) {
        tierListTitle.textContent =
            category.toUpperCase() + " TIERS";
    }


    // Load database rankings
    loadRankings(category);
}


// ================================
// LOAD FIRST CATEGORY
// ================================
selectCategory(selectedCategory);


// ================================
// CATEGORY BUTTON CLICKS
// ================================
categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const category =
            button.getAttribute("data-category");

        selectCategory(category);

        // Update URL without refreshing
        const newUrl =
            "rankings.html?category=" +
            encodeURIComponent(category);

        window.history.replaceState(
            {},
            "",
            newUrl
        );
    });
});

});