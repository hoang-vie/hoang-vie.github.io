# H & S Lab — Portfolio Site

Static site hosted on **GitHub Pages**. No build step required.

## Folder structure

```
/
├── index.html            ← Home · Gallery · Contact
├── css/
│   └── style.css         ← ALL styles (colours, layout, components)
├── js/
│   └── nav.js            ← Sidebar toggle, tab switching, URL hash
├── pages/
│   ├── hoang.html        ← Hoang: Profile / Projects / Files (tabbed)
│   ├── sang.html         ← Sang:  Profile / Projects / Files (tabbed)
│   └── _sidebar.html     ← Reference snippet — NOT a real page
└── images/               ← Drop images here, then link them in HTML
```

---

## How to add a project card

Open the relevant `pages/hoang.html` or `pages/sang.html`, find the
`<!-- Tab: Projects -->` section and copy-paste a `.card` block:

```html
<div class="card">
    <div class="card-tag">Language · Tool</div>
    <div class="card-title">Your project title</div>
    <div class="card-desc">Short description of the project.</div>
    <div class="card-footer">
        <div class="card-status">
            <span class="dot-status dot-active"></span> In progress
            <!-- or dot-done for completed -->
        </div>
        <div class="card-year">2025</div>
    </div>
</div>
```

---

## How to add a file entry

In the `<!-- Tab: Files -->` section, add a `.file-row`:

```html
<div class="file-row">
    <span class="file-type">.py</span>
    <span class="file-name">your_script.py</span>
    <span class="file-desc">What the file does</span>
    <a class="file-link" href="../code/hoang/your_script.py">View</a>
</div>
```

Push the actual file to the repo at the path used in `href`.

---

## How to add a gallery image

1. Place the image in `/images/your_photo.png`
2. In `index.html`, find the `<!-- GALLERY -->` section and add:

```html
<div class="gal-item">
    <img src="images/your_photo.png" alt="Description">
</div>
```

---

## How to change colours

All colours are CSS variables at the top of `css/style.css` under `:root { }`.
Edit that block only — nothing else needs to change.

---

## Deploying to GitHub Pages

1. Push all files to the `main` (or `gh-pages`) branch
2. Go to **Settings → Pages → Source → Deploy from branch**
3. Select the branch and `/ (root)` folder
4. Your site will be live at `https://<username>.github.io/<repo>/`