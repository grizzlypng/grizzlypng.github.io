# goetjen portfolio

A single-file portfolio site in the spirit of [umru.dj](https://umru.dj) — split layout, draggable Y2K popup ads, grainy monospace type. Everything lives in `index.html` (HTML, CSS, and JS inline) so it drops onto GitHub Pages with zero build step.

---

## Deploy to GitHub Pages

1. Create a new public repo on GitHub. If you want the URL to be `https://<your-username>.github.io` (no path suffix), name the repo exactly `<your-username>.github.io`. Otherwise pick any name — the site will live at `https://<your-username>.github.io/<repo-name>/`.
2. Upload `index.html` (and `README.md` if you want) to the repo root. You can drag-and-drop in the GitHub web UI, or use git:
   ```bash
   git init
   git add index.html README.md
   git commit -m "initial"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick `main` and `/ (root)`, then **Save**.
4. Give it a minute. The site publishes at the URL shown on the Pages settings page.

---

## Local preview

Just open `index.html` in a browser. No server needed. If you want live reload, you can run any static server, e.g.:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Customize

### Swap in your reel video
Drop an MP4 named `reel.mp4` at the repo root. The `<video>` tag on the left side will pick it up automatically (autoplay, muted, loop). If no file is present, the animated grainy fallback stays visible — so you can ship the site without a reel and add one later.

Keep the file small — under ~5MB is ideal for GitHub Pages. Compress with something like [HandBrake](https://handbrake.fr/) or the CLI:
```bash
ffmpeg -i input.mov -vcodec libx264 -crf 28 -preset slow -an -movflags +faststart reel.mp4
```

### Add your resume
Drop a `resume.pdf` at the repo root. The "resume.pdf" link in the contact section will download it.

### Edit copy
Everything is in `index.html`. Search for:
- `Brooklyn, NY` — location line
- `SELECTED WORK` — the section header before Vayu / Escape Virtuality / Rhythma
- `PARTNERSHIPS · GRIZZLYPNG` — the brand deals section
- `STACK` — the tools list

The three work blocks (Vayu, Escape Virtuality, Rhythma) use the same `<article class="work-block">` structure. Copy one, change the fields, done.

### Contact
The contact block currently points at:
- `mailto:will@grizzlypng.com`
- `https://linkedin.com/in/williamgoetjen`
- `./resume.pdf`

Swap these to your real handles.

### Rewrite the popup ads
The four ads are HTML at the bottom of `index.html` inside `<div class="ad ...">` blocks. Each one has a distinct visual style (`ad-lose`, `ad-two`, `ad-unread`, `ad-hate`). You can:
- Change the copy inside any ad
- Reposition where they start via the inline `style="top: ...px; left: ...px;"`
- Delete an ad entirely by removing its `<div class="ad ...">` block
- Add new ones by copying an existing block and giving it a new position

### Favicon (optional)
Drop a `favicon.ico` or `favicon.png` at the root and add this to the `<head>`:
```html
<link rel="icon" href="favicon.png" type="image/png">
```

---

## How the design works

- **Colors** are CSS variables at the top of the `<style>` block (`--bg`, `--fg`, `--accent`, etc). Change them there and everything updates.
- **Type** is IBM Plex Mono, loaded from Google Fonts. The whole page uses weights `300–700` of the same face.
- **Ads** are absolutely positioned. On desktop they're draggable (drag by any non-button area). On mobile (< 820px wide) they collapse into a static stack under the content — dragging is disabled because it's annoying on a phone.
- **Restore popups** button at the bottom-left brings back any ads you've closed via their × button.
- **Reduced motion** is respected — the grain drift, blinking record dot, and transitions all pause for users who prefer reduced motion.

---

## Structure

```
/
├── index.html      # the whole site
├── README.md       # this file
├── reel.mp4        # (optional) your video reel — drops into the left side
├── resume.pdf      # (optional) resume download
└── favicon.png     # (optional) tab icon
```
