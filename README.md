# 🎮 ARCADEZONE — Games Site Template

## Your File Structure

```
your-site/
│
├── index.html              ← Homepage (edit this to add game cards)
│
└── games/
    ├── game1/
    │   ├── index.html      ← Game page template (copy for each game)
    │   └── game-files/     ← Put your game files here (index.html, etc.)
    │
    ├── game2/
    │   ├── index.html
    │   └── game-files/
    │
    └── ... (repeat for each game)
```

---

## How to Add a New Game

### Step 1 — Add the game files
1. Create a new folder inside `games/` (e.g. `games/snake/`)
2. Inside it, create a `game-files/` folder
3. Drop all your game files into `game-files/` (index.html, images, JS, etc.)

### Step 2 — Copy the game page
1. Copy `games/game1/index.html` into your new folder
2. Edit these things in the file:
   - `<title>` tag — change the game name
   - `.game-title` div — change the title
   - `.game-tag` div — change the category (Arcade, Puzzle, Action, etc.)
   - `iframe src` — change to `game-files/index.html`
   - The description paragraph and controls

### Step 3 — Add a card on the homepage
1. Open `index.html`
2. Copy one of the `.game-card` blocks
3. Change the:
   - `href` — point to your new game page
   - emoji or `<img>` — add a screenshot
   - game tag, title, and description

---

## How to Add Google AdSense

1. Apply at https://adsense.google.com
2. Once approved, get your ad code snippets
3. In each HTML file, find the comments that say:
   `<!-- ADSENSE: Replace with your AdSense ... code -->`
4. Delete the `<div class="ad-placeholder">` below it
5. Paste your AdSense `<ins>` code there

Best ad spots (already marked in the HTML):
- **728×90** — Top of every page (leaderboard)
- **336×280** — Below the game (highest earnings!)
- **160×600** — Right sidebar (skyscraper)

---

## How to Upload to GitHub Pages

1. Create a free account at https://github.com
2. Click **New Repository** → name it `arcadezone` (or anything)
3. Click **Add file → Upload files**
4. Drag and drop your entire site folder
5. Commit the files
6. Go to **Settings → Pages**
7. Under Source, select **main branch → / (root)**
8. Click Save — your site will be live at:
   `https://yourusername.github.io/arcadezone`

---

## Tips

- Always test games locally before uploading (just open index.html in your browser)
- Use real screenshots instead of emojis for game thumbnails (better for SEO)
- Add more pages/categories as you grow
- Keep game file sizes small for fast loading
