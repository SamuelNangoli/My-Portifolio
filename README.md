# Samuel Nangoli — Portfolio

A fast, accessible, single-page portfolio for a full-stack / product developer.
Static site — **no backend, no build step**. Everything (HTML, CSS, and JavaScript) is
bundled into a single **self-contained `index.html`**, so it works even when opened
straight from disk.

## Files

```
portfolio/
├── index.html        # The whole site — markup + inlined CSS + inlined JS + SEO tags
├── assets/
│   ├── favicon.svg   # "SN" monogram — replace with your own mark
│   └── og-image.png  # (add this) 1200×630 social share image
└── README.md
```

> The CSS and JavaScript are **inlined inside `index.html`**. This is deliberate: it means
> double-clicking the file opens the fully styled site, with no separate `styles.css` /
> `main.js` that a browser might fail to load from a local (e.g. OneDrive-synced) folder.

## Run it locally

- **Easiest:** double-click `index.html` — it opens fully styled in your default browser.
- **With a local server** (optional, mirrors production hosting):

```bash
npx serve portfolio
```

or

```bash
python -m http.server 8000
```

Then open the printed URL (e.g. http://localhost:8000).

## Deploy

Because it's a static site, deployment is drag-and-drop simple.

- **Netlify:** drag the `portfolio/` folder onto the Netlify dashboard, or connect the repo and set the publish directory to `portfolio` (no build command).
- **Vercel:** import the repo, framework preset **Other**, output/root = `portfolio`.
- **GitHub Pages:** push to a repo, enable Pages, serve from the branch root (or `/portfolio`).
- **Cloudflare Pages / any static host:** upload the folder — that's it.

## Customise

> Everything below is edited **inside `index.html`**. Open it in any text editor. The CSS lives
> in the `<style>` block near the top; the JavaScript lives in the `<script>` block near the bottom.

### Add your portrait
The hero and the About "driver profile" card show a placeholder until you add a photo.
Just drop a file named **`portrait.jpg`** into the `assets/` folder — it appears automatically
in both places (no code change needed). Recommended: portrait orientation, roughly 4:5
(e.g. 800×1000), optimised. If the file is missing, a clean "SN" placeholder shows instead.

### Add project screenshots
Each project renders a gradient placeholder until you add an image.
In `index.html`, find the `PROJECTS` array in the `<script>` block, locate the project, and set its `image`:

```js
{
  id: "bodapay",
  title: "BodaPay",
  // ...
  image: "assets/bodapay.png"   // was: image: null
}
```

Drop the file into `assets/`. Recommended: 16:9 ratio (e.g. 1280×720), optimised (WebP/PNG/JPG).
Images are lazy-loaded and get sensible `alt` text automatically.

### Add your GitHub & LinkedIn links
In `index.html`, find the `.socials` list in the Contact section and replace the
`href="#"` values with your real profile URLs.

### Social share image (Open Graph)
Add `assets/og-image.png` (1200×630). The `<meta property="og:image">` tag in
`index.html` already points to it. Update the `og:url` / `canonical` URLs to your
real domain while you're there.

### Edit content
All in `index.html`:
- **Hero, about, experience, education, skills, contact:** edit the HTML markup directly (each is its own `<section>`).
- **Projects:** all project text lives in the `PROJECTS` array in the `<script>` block.
- **Accent color:** change `--accent` (and `--accent-dark`) in the `:root` block at the top of `<style>`.
- **Availability note:** the "Available for select projects" pill is in the hero markup.

## Accessibility & performance notes

- Semantic HTML, skip link, keyboard-navigable nav and modal (native `<dialog>`).
- Visible focus states, WCAG AA color contrast, `prefers-reduced-motion` respected.
- Lazy-loaded images, no framework, no heavy dependencies — fast first paint.
- Content works without a build step; the project gallery requires JavaScript.

---

© Samuel Nangoli — Kampala, Uganda · xamsamuel079@gmail.com
