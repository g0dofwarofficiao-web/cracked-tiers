document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // SUPABASE CONNECTION
    // ================================
    const SUPABASE_URL = "https://twgnubacplneragssrot.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_O4hAWDj8dTdSsHTL6j9nrg_SEOZIQiR";


    // ================================
    // COMMON SUPABASE FETCH FUNCTION
    // ================================
    async function fetchRankings(query = "") {

        const response = await fetch(
            SUPABASE_URL +
            "/rest/v1/rankings?select=player_name,tier,category" +
            query,
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

        return await response.json();
    }


    // ==========================================
    // PLAYER SEARCH SYSTEM
    // ==========================================
    const searchInput =
        document.getElementById("playerSearch");

    const searchButton =
        document.getElementById("searchButton");

    const searchResults =
        document.getElementById("searchResults");


    if (searchInput && searchButton && searchResults) {

        async function searchPlayer() {

            const playerName =
                searchInput.value.trim();

            // Don't search an empty name
            if (playerName === "") {

                searchResults.innerHTML = `
                    <div class="search-message">
                        Enter a Minecraft username.
                    </div>
                `;

                return;
            }


            // Show loading message
            searchResults.innerHTML = `
                <div class="search-message">
                    Searching...
                </div>
            `;


            try {

                // Search database for the player
                const players =
                    await fetchRankings(
                        "&player_name=ilike." +
                        encodeURIComponent(playerName)
                    );


                // Player not found
                if (players.length === 0) {

                    searchResults.innerHTML = `
                        <div class="search-message not-found">
                            Player <strong>${playerName}</strong>
                            is not ranked yet.
                        </div>
                    `;

                    return;
                }


                // Show all rankings for the player
                const rankingsHTML =
                    players
                        .map(function (player) {

                            return `
                                <div class="search-ranking">
                                    <span class="search-category">
                                        ${player.category}
                                    </span>

                                    <span class="search-tier">
                                        ${player.tier}
                                    </span>
                                </div>
                            `;
                        })
                        .join("");


                searchResults.innerHTML = `
                    <div class="player-result">

                        <div class="player-result-name">
                            ${players[0].player_name}
                        </div>

                        <div class="player-rankings">
                            ${rankingsHTML}
                        </div>

                    </div>
                `;


            } catch (error) {

                console.error(
                    "Player search error:",
                    error
                );

                searchResults.innerHTML = `
                    <div class="search-message not-found">
                        Unable to search right now.
                        Please try again.
                    </div>
                `;
            }
        }


        // Search button click
        searchButton.addEventListener(
            "click",
            searchPlayer
        );


        // Search when Enter is pressed
        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    searchPlayer();
                }
            }
        );
    }


    // ==========================================
    // HOME PAGE — LIVE TOP PLAYERS
    // ==========================================
    const homeLeaderboard =
        document.querySelector(".leaderboard");

    if (homeLeaderboard) {

        async function loadHomePlayers() {

            try {

                const players =
                    await fetchRankings("");

                const oldRows =
                    homeLeaderboard.querySelectorAll(
                        ".leaderboard-row:not(.header-row)"
                    );

                oldRows.forEach(function (row) {
                    row.remove();
                });


                if (players.length === 0) {

                    const emptyRow =
                        document.createElement("div");

                    emptyRow.className =
                        "leaderboard-row";

                    emptyRow.innerHTML = `
                        <span class="rank">-</span>
                        <span class="player">
                            No players ranked yet
                        </span>
                        <span class="tier">-</span>
                    `;

                    homeLeaderboard.appendChild(
                        emptyRow
                    );

                    return;
                }


                players.slice(0, 3).forEach(
                    function (player, index) {

                        const row =
                            document.createElement("div");

                        row.className =
                            "leaderboard-row";

                        row.innerHTML = `
                            <span class="rank">
                                #${index + 1}
                            </span>

                            <span class="player">
                                ${player.player_name}
                            </span>

                            <span class="tier">
                                ${player.tier}
                            </span>
                        `;

                        homeLeaderboard.appendChild(row);
                    }
                );

            } catch (error) {

                console.error(
                    "Home ranking loading error:",
                    error
                );
            }
        }

        loadHomePlayers();
    }


    // ==========================================
    // RANKINGS PAGE — CATEGORY SYSTEM
    // ==========================================
    const categoryButtons =
        document.querySelectorAll(".category-tab");

    const categoryTitle =
        document.getElementById("categoryTitle");

    const tierListTitle =
        document.getElementById("tierListTitle");

    const rankingTable =
        document.querySelector(".ranking-table");

    const tierGroups =
        document.querySelectorAll(".tier-group");


    if (categoryButtons.length > 0 && rankingTable) {

        const urlParams =
            new URLSearchParams(
                window.location.search
            );

        const selectedCategory =
            urlParams.get("category") || "Sword";


        async function loadRankings(category) {

            try {

                const players =
                    await fetchRankings(
                        "&category=eq." +
                        encodeURIComponent(category)
                    );

                displayLeaderboard(players);
                displayTierList(players);

            } catch (error) {

                console.error(
                    "Ranking loading error:",
                    error
                );

                showRankingError();
            }
        }


        function displayLeaderboard(players) {

            const oldRows =
                rankingTable.querySelectorAll(
                    ".ranking-table-row:not(.table-header)"
                );

            oldRows.forEach(function (row) {
                row.remove();
            });


            if (players.length === 0) {

                const emptyRow =
                    document.createElement("div");

                emptyRow.className =
                    "ranking-table-row";

                emptyRow.innerHTML = `
                    <span>-</span>
                    <span class="player-name">
                        No players ranked yet
                    </span>
                    <span>-</span>
                `;

                rankingTable.appendChild(emptyRow);

                return;
            }


            players.forEach(
                function (player, index) {

                    const row =
                        document.createElement("div");

                    row.className =
                        "ranking-table-row";

                    row.innerHTML = `
                        <span class="position">
                            ${index + 1}
                        </span>

                        <span class="player-name">
                            ${player.player_name}
                        </span>

                        <span class="tier-badge">
                            ${player.tier}
                        </span>
                    `;

                    rankingTable.appendChild(row);
                }
            );
        }


        function displayTierList(players) {

            tierGroups.forEach(function (group) {

                const tierLabel =
                    group.querySelector(".tier-label");

                const tierPlayers =
                    group.querySelector(
                        ".tier-players"
                    );

                if (!tierLabel || !tierPlayers) {
                    return;
                }

                const tierName =
                    tierLabel.textContent.trim();

                const playersInTier =
                    players.filter(function (player) {
                        return player.tier === tierName;
                    });


                if (playersInTier.length === 0) {

                    tierPlayers.innerHTML =
                        "<span>No players yet</span>";

                } else {

                    tierPlayers.innerHTML =
                        playersInTier
                            .map(function (player) {

                                return `
                                    <span>
                                        ${player.player_name}
                                    </span>
                                `;

                            })
                            .join("");
                }
            });
        }


        function showRankingError() {

            const oldRows =
                rankingTable.querySelectorAll(
                    ".ranking-table-row:not(.table-header)"
                );

            oldRows.forEach(function (row) {
                row.remove();
            });


            const errorRow =
                document.createElement("div");

            errorRow.className =
                "ranking-table-row";

            errorRow.innerHTML = `
                <span>!</span>

                <span class="player-name">
                    Unable to load rankings
                </span>

                <span>!</span>
            `;

            rankingTable.appendChild(errorRow);
        }


        function selectCategory(category) {

            categoryButtons.forEach(function (button) {

                const buttonCategory =
                    button.getAttribute(
                        "data-category"
                    );

                button.classList.remove("active");

                if (buttonCategory === category) {
                    button.classList.add("active");
                }
            });


            if (categoryTitle) {

                categoryTitle.textContent =
                    category.toUpperCase() +
                    " RANKINGS";
            }


            if (tierListTitle) {

                tierListTitle.textContent =
                    category.toUpperCase() +
                    " TIERS";
            }


            loadRankings(category);
        }


        // Load category from URL
        selectCategory(selectedCategory);


        categoryButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const category =
                        button.getAttribute(
                            "data-category"
                        );

                    selectCategory(category);


                    const newUrl =
                        "rankings.html?category=" +
                        encodeURIComponent(category);

                    window.history.replaceState(
                        {},
                        "",
                        newUrl
                    );
                }
            );
        });
    }

});