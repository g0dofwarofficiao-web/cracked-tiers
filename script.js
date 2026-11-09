// Cracked Tiers JavaScript
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
--bg: #09090c;
--surface: #111116;
--surface-light: #18181f;
--purple: #8b5cf6;
--purple-bright: #a78bfa;
--text: #f5f3ff;
--muted: #9b9baa;
--border: rgba(255, 255, 255, 0.08);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }

html {
scroll-behavior: smooth;
}

body {
background: var(--bg);
color: var(--text);
font-family: "Space Grotesk", sans-serif;
line-height: 1.6;
}

a {
color: inherit;
text-decoration: none;
}

/* Navigation */
.navbar {
width: 100%;
padding: 18px 6%;
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid var(--border);
background: rgba(9, 9, 12, 0.92);
position: sticky;
top: 0;
z-index: 100;
backdrop-filter: blur(12px);
}

.brand {
display: flex;
align-items: center;
gap: 9px;
font-family: "Rajdhani", sans-serif;
font-size: 1.25rem;
font-weight: 700;
letter-spacing: 1px;
}

.brand-icon {
color: var(--purple-bright);
font-size: 1.4rem;
}

.nav-links {
display: flex;
gap: 16px;
font-size: 0.85rem;
color: var(--muted);
}

.nav-links a:hover {
color: var(--purple-bright);
}

/* Hero */
.hero {
min-height: 650px;
display: flex;
align-items: center;
padding: 80px 6%;
background:
radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.15), transparent 35%),
var(--bg);
}

.hero-content {
max-width: 780px;
}

.eyebrow {
color: var(--purple-bright);
font-family: "Rajdhani", sans-serif;
font-weight: 700;
letter-spacing: 3px;
font-size: 0.85rem;
margin-bottom: 12px;
}

h1, h2, h3 {
font-family: "Rajdhani", sans-serif;
line-height: 0.95;
}

.hero h1 {
font-size: clamp(3.5rem, 10vw, 7rem);
font-weight: 700;
letter-spacing: -2px;
}

.hero h1 span {
color: var(--purple-bright);
}

.hero-text {
color: var(--muted);
max-width: 620px;
margin: 24px 0;
font-size: 1rem;
}

/* Search */
.search-box {
display: flex;
max-width: 620px;
margin: 28px 0 20px;
}

.search-box input {
flex: 1;
min-width: 0;
border: 1px solid var(--border);
border-right: none;
background: var(--surface);
color: var(--text);
padding: 16px;
outline: none;
font-family: inherit;
}

.search-box input:focus {
border-color: var(--purple);
}

.search-box button,
.primary-button {
border: none;
background: var(--purple);
color: white;
padding: 14px 22px;
font-family: "Rajdhani", sans-serif;
font-weight: 700;
letter-spacing: 1px;
cursor: pointer;
transition: 0.2s ease;
}

.search-box button:hover,
.primary-button:hover {
background: var(--purple-bright);
transform: translateY(-1px);
}

.primary-button {
display: inline-block;
}

/* General Sections */
.section {
padding: 90px 6%;
max-width: 1400px;
margin: auto;
}

.section-heading {
margin-bottom: 35px;
}

.section h2,
.discord-section h2 {
font-size: clamp(2.5rem, 6vw, 4rem);
}

/* Categories */
.category-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
gap: 14px;
}

.category-card {
background: var(--surface);
border: 1px solid var(--border);
padding: 28px 20px;
transition: 0.25s ease;
cursor: pointer;
}

.category-card:hover {
transform: translateY(-5px);
border-color: var(--purple);
background: var(--surface-light);
}

.category-card span {
font-size: 2rem;
}

.category-card h3 {
margin-top: 15px;
font-size: 1.4rem;
}

/* Leaderboard */
.rankings-section {
padding-top: 30px;
}

.leaderboard {
border: 1px solid var(--border);
background: var(--surface);
overflow: hidden;
}

.leaderboard-row {
display: grid;
grid-template-columns: 90px 1fr 90px;
gap: 15px;
align-items: center;
padding: 18px 22px;
border-bottom: 1px solid var(--border);
}

.leaderboard-row:last-child {
border-bottom: none;
}

.header-row {
font-size: 0.75rem;
letter-spacing: 1px;
color: var(--muted);
font-weight: 700;
}

.rank {
color: var(--purple-bright);
font-weight: 700;
}

.player {
font-weight: 600;
}

.tier {
font-family: "Rajdhani", sans-serif;
font-weight: 700;
font-size: 1.1rem;
color: var(--purple-bright);
}

/* Discord */
.discord-section {
margin: 60px 6%;
padding: 70px 8%;
text-align: center;
background:
radial-gradient(circle at center, rgba(139, 92, 246, 0.18), transparent 60%),
var(--surface);
border: 1px solid var(--border);
}

.discord-section p:not(.eyebrow) {
color: var(--muted);
margin: 20px auto 28px;
max-width: 600px;
}

/* Footer */
footer {
border-top: 1px solid var(--border);
padding: 40px 6%;
color: var(--muted);
}

footer .brand {
color: var(--text);
margin-bottom: 15px;
}

footer p {
font-size: 0.85rem;
}

.copyright {
margin-top: 20px;
}

/* Mobile */
@media (max-width: 600px) {
.navbar {
padding: 14px 5%;
}

.brand {
    font-size: 1rem;
}

.nav-links {
    gap: 10px;
    font-size: 0.72rem;
}

.hero {
    min-height: 600px;
    padding: 60px 6%;
}

.hero h1 {
    font-size: 3.4rem;
}

.search-box {
    flex-direction: column;
}

.search-box input {
    border-right: 1px solid var(--border);
    border-bottom: none;
}

.search-box button {
    width: 100%;
}

.section {
    padding: 70px 6%;
}

.category-grid {
    grid-template-columns: repeat(2, 1fr);
}

.leaderboard-row {
    grid-template-columns: 55px 1fr 55px;
    padding: 15px;
    gap: 8px;
}

.discord-section {
    margin: 30px 5%;
    padding: 55px 7%;
}

}