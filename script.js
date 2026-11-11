document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // SUPABASE CONNECTION
    // ================================
    const SUPABASE_URL =
        "https://twgnubacplneragssrot.supabase.co";

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
                    "Authorization":
                        "Bearer " + SUPABASE_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                "Could not load rankings"
            );
        }

        return await response.json();
    }


    // ==========================================
    // CREATE PLAYER PROFILE LINK
    // ==========================================
    function getPlayerLink(playerName) {

        return (
            "player.html?name=" +
            encodeURIComponent(playerName)
        );
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


    if (
        searchInput &&
        searchButton &&
        searchResults
    ) {

        async function searchPlayer() {

            const playerName =
                searchInput.value.trim();


            if (playerName === "") {

                searchResults.innerHTML = `
                    <div class="search-message">
                        Enter a Minecraft username.
                    </div>
                `;

                return;
            }


            searchResults.innerHTML = `
                <div class="search-message">
                    Searching...
                </div>
            `;


            try {

                const players =
                    await fetchRankings(
                        "&player_name=ilike." +
                        encodeURIComponent(playerName)
                    );


                if (players.length === 0) {

                    searchResults.innerHTML = `
                        <div class="search-message not-found">
                            Player
                            <strong>${playerName}</strong>
                            is not ranked yet.
                        </div>
                    `;

                    return;
                }


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


                const profileLink =
                    getPlayerLink(
                        players[0].player_name
                    );


                searchResults.innerHTML = `
                    <div class="player-result">

                        <a
                            href="${profileLink}"
                            class="player-result-name player-link"
                        >
                            ${players[0].player_name}
                        </a>

                        <div class="player-rankings">
                            ${rankingsHTML}
                        </div>

                        <a
                            href="${profileLink}"
                            class="view-profile-button"
                        >
                            VIEW PLAYER PROFILE →
                        </a>

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


        searchButton.addEventListener(
            "click",
            searchPlayer
        );


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
    // PLAYER PROFILE PAGE
    // ==========================================
    const playerProfileContent =
        document.getElementById(
            "playerProfileContent"
        );


    if (playerProfileContent) {

        async function loadPlayerProfile() {

            const urlParams =
                new URLSearchParams(
                    window.location.search
                );

            const requestedName =
                urlParams.get("name");


            if (!requestedName) {

                playerProfileContent.innerHTML = `
                    <div class="profile-message">
                        <h1>PLAYER NOT FOUND</h1>

                        <p>
                            No player was selected.
                        </p>

                        <a
                            href="index.html"
                            class="primary-button"
                        >
                            GO HOME
                        </a>
                    </div>
                `;

                return;
            }


            try {

                const players =
                    await fetchRankings(
                        "&player_name=ilike." +
                        encodeURIComponent(
                            requestedName
                        )
                    );


                if (players.length === 0) {

                    playerProfileContent.innerHTML = `
                        <div class="profile-message">

                            <p class="eyebrow">
                                PLAYER PROFILE
                            </p>

                            <h1>PLAYER NOT FOUND</h1>

                            <p>
                                This player is not
                                currently ranked on
                                Cracked Tiers.
                            </p>

                            <a
                                href="rankings.html"
                                class="primary-button"
                            >
                                VIEW RANKINGS
                            </a>

                        </div>
                    `;

                    return;
                }


                const actualPlayerName =
                    players[0].player_name;


                document.title =
                    actualPlayerName +
                    " | Cracked Tiers";


                const rankingCards =
                    players
                        .map(function (player) {

                            return `
                                <a
                                    href="rankings.html?category=${encodeURIComponent(
                                        player.category
                                    )}"
                                    class="profile-ranking-card"
                                >

                                    <span class="profile-category">
                                        ${player.category}
                                    </span>

                                    <span class="profile-tier">
                                        ${player.tier}
                                    </span>

                                </a>
                            `;

                        })
                        .join("");


                playerProfileContent.innerHTML = `

                    <div class="profile-header">

                        <p class="eyebrow">
                            PLAYER PROFILE
                        </p>

                        <h1>
                            ${actualPlayerName}
                        </h1>

                        <p class="profile-subtitle">
                            Official Cracked Tiers
                            rankings.
                        </p>

                    </div>


                    <div class="profile-stats">

                        <div class="profile-stat">

                            <span class="stat-number">
                                ${players.length}
                            </span>

                            <span class="stat-label">
                                RANKINGS
                            </span>

                        </div>


                        <div class="profile-stat">

                            <span class="stat-number">
                                ${new Set(
                                    players.map(
                                        function (player) {
                                            return player.category;
                                        }
                                    )
                                ).size}
                            </span>

                            <span class="stat-label">
                                CATEGORIES
                            </span>

                        </div>

                    </div>


                    <div class="profile-rankings-section">

                        <div class="section-heading">

                            <p class="eyebrow">
                                COMPETITIVE RECORD
                            </p>

                            <h2>
                                PLAYER RANKINGS
                            </h2>

                        </div>


                        <div class="profile-ranking-grid">

                            ${rankingCards}

                        </div>

                    </div>


                    <a
                        href="rankings.html"
                        class="primary-button profile-back-button"
                    >
                        ← VIEW ALL RANKINGS
                    </a>

                `;


            } catch (error) {

                console.error(
                    "Player profile loading error:",
                    error
                );

                playerProfileContent.innerHTML = `
                    <div class="profile-message">

                        <h1>
                            SOMETHING WENT WRONG
                        </h1>

                        <p>
                            Unable to load this
                            player's profile.
                        </p>

                        <a
                            href="index.html"
                            class="primary-button"
                        >
                            GO HOME
                        </a>

                    </div>
                `;
            }
        }


        loadPlayerProfile();
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

                oldRows.forEach(
                    function (row) {
                        row.remove();
                    }
                );


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


                players
                    .slice(0, 3)
                    .forEach(
                        function (player, index) {

                            const row =
                                document.createElement(
                                    "div"
                                );

                            row.className =
                                "leaderboard-row";


                            const profileLink =
                                getPlayerLink(
                                    player.player_name
                                );


                            row.innerHTML = `
                                <span class="rank">
                                    #${index + 1}
                                </span>

                                <a
                                    href="${profileLink}"
                                    class="player player-link"
                                >
                                    ${player.player_name}
                                </a>

                                <span class="tier">
                                    ${player.tier}
                                </span>
                            `;


                            homeLeaderboard.appendChild(
                                row
                            );
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
        document.querySelectorAll(
            ".category-tab"
        );

    const categoryTitle =
        document.getElementById(
            "categoryTitle"
        );

    const tierListTitle =
        document.getElementById(
            "tierListTitle"
        );

    const rankingTable =
        document.querySelector(
            ".ranking-table"
        );

    const tierGroups =
        document.querySelectorAll(
            ".tier-group"
        );


    if (
        categoryButtons.length > 0 &&
        rankingTable
    ) {

        const urlParams =
            new URLSearchParams(
                window.location.search
            );

        const selectedCategory =
            urlParams.get("category") ||
            "Sword";


        async function loadRankings(category) {

            try {

                const players =
                    await fetchRankings(
                        "&category=eq." +
                        encodeURIComponent(
                            category
                        )
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


        // ==========================================
        // DISPLAY LEADERBOARD
        // ==========================================
        function displayLeaderboard(players) {

            const oldRows =
                rankingTable.querySelectorAll(
                    ".ranking-table-row:not(.table-header)"
                );

            oldRows.forEach(
                function (row) {
                    row.remove();
                }
            );


            if (players.length === 0) {

                const emptyRow =
                    document.createElement(
                        "div"
                    );

                emptyRow.className =
                    "ranking-table-row";

                emptyRow.innerHTML = `
                    <span>-</span>

                    <span class="player-name">
                        No players ranked yet
                    </span>

                    <span>-</span>
                `;

                rankingTable.appendChild(
                    emptyRow
                );

                return;
            }


            players.forEach(
                function (player, index) {

                    const row =
                        document.createElement(
                            "div"
                        );

                    row.className =
                        "ranking-table-row";


                    const profileLink =
                        getPlayerLink(
                            player.player_name
                        );


                    row.innerHTML = `
                        <span class="position">
                            ${index + 1}
                        </span>

                        <a
                            href="${profileLink}"
                            class="player-name player-link"
                        >
                            ${player.player_name}
                        </a>

                        <span class="tier-badge">
                            ${player.tier}
                        </span>
                    `;


                    rankingTable.appendChild(
                        row
                    );
                }
            );
        }


        // ==========================================
        // DISPLAY TIER LIST
        // ==========================================
        function displayTierList(players) {

            tierGroups.forEach(
                function (group) {

                    const tierLabel =
                        group.querySelector(
                            ".tier-label"
                        );

                    const tierPlayers =
                        group.querySelector(
                            ".tier-players"
                        );


                    if (
                        !tierLabel ||
                        !tierPlayers
                    ) {
                        return;
                    }


                    const tierName =
                        tierLabel.textContent.trim();


                    const playersInTier =
                        players.filter(
                            function (player) {

                                return (
                                    player.tier ===
                                    tierName
                                );
                            }
                        )