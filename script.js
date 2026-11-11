document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // SUPABASE CONNECTION
    // ================================
    const SUPABASE_URL = "https://twgnubacplneragssrot.supabase.co";
    const SUPABASE_KEY = "sb_publishable_O4hAWDj8dTdSsHTL6j9nrg_SEOZIQiR";


    // ================================
    // COMMON PAGE ELEMENTS
    // ================================
    const categoryButtons = document.querySelectorAll(".category-tab");
    const categoryTitle = document.getElementById("categoryTitle");
    const tierListTitle = document.getElementById("tierListTitle");
    const leaderboard = document.querySelector(".ranking-table");
    const tierGroups = document.querySelectorAll(".tier-group");


    // ================================
    // LOAD RANKINGS PAGE
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
    // DISPLAY RANKINGS LEADERBOARD
    // ================================
    function displayLeaderboard(players) {

        if (!leaderboard) return;

        const oldRows = leaderboard.querySelectorAll(
            ".ranking-table-row:not(.table-header)"
        );

        oldRows.forEach(function (row) {
            row.remove();
        });

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

            if (playersInTier.length === 0) {
                tierPlayers.innerHTML = "<span>No players yet</span>";
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

            const buttonCategory = button.getAttribute("data-category");

            button.classList.remove("active");

            if (buttonCategory === category) {
                button.classList.add("active");
            }
        });

        if (categoryTitle) {
            categoryTitle.textContent =
                category.toUpperCase() + " RANKINGS";
        }

        if (tierListTitle) {
            tierListTitle.textContent =
                category.toUpperCase() + " TIERS";
        }

        loadRankings(category);
    }


    // ================================
    // INITIALIZE RANKINGS PAGE
    // ================================
    if (categoryButtons.length > 0) {

        const urlParams = new URLSearchParams(window.location.search);
        const selectedCategory =
            urlParams.get("category") || "Sword";

        selectCategory(selectedCategory);

        categoryButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const category =
                    button.getAttribute("data-category");

                selectCategory(category);

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
    }


    // ================================
    // HOMEPAGE TOP PLAYERS
    // ================================
    async function loadHomepagePlayers() {

        const homepageLeaderboard =
            document.querySelector(".leaderboard");

        // Only run this on the homepage
        if (!homepageLeaderboard) return;

        try {

            const response = await fetch(
                SUPABASE_URL +
                "/rest/v1/rankings?select=player_name,tier,category&limit=3",
                {
                    headers: {
                        "apikey": SUPABASE_KEY,
                        "Authorization": "Bearer " + SUPABASE_KEY
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Could not load homepage players");
            }

            const players = await response.json();

            // Remove old sample player rows but keep header
            const oldRows = homepageLeaderboard.querySelectorAll(
                ".leaderboard-row:not(.header-row)"
            );

            oldRows.forEach(function (row) {
                row.remove();
            });

            // Show message if there are no players
            if (players.length === 0) {

                const emptyRow = document.createElement("div");
                emptyRow.className = "leaderboard-row";

                emptyRow.innerHTML = `
                    <span class="rank">-</span>
                    <span class="player">No players ranked yet</span>
                    <span class="tier">-</span>
                `;

                homepageLeaderboard.appendChild(emptyRow);
                return;
            }

            // Add real players
            players.forEach(function (player, index) {

                const row = document.createElement("div");
                row.className = "leaderboard-row";

                row.innerHTML = `
                    <span class="rank">#${index + 1}</span>
                    <span class="player">${player.player_name}</span>
                    <span class="tier">${player.tier}</span>
                `;

                homepageLeaderboard.appendChild(row);
            });

        } catch (error) {

            console.error("Homepage loading error:", error);

        }
    }


    // Load homepage players
    loadHomepagePlayers();

});