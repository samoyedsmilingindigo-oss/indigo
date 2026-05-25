# Lumina Studio — Landing Page

![Hero Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80)

> A beautiful, modern static landing page designed for **GitHub Pages** — white & blue colour system, smooth entrance animations, interactive gallery with lightbox, and a working contact form.

---

## Features

| Section | Details |
|---|---|
| **Hero** | Full-screen with animated gradient orbs, floating cards, parallax on mouse-move, counter animation |
| **About** | Stacked image layout, experience badge, brand pillars |
| **Services** | 6-card grid with hover effects (5 services + CTA card) |
| **Gallery** | Masonry grid, category filters, lightbox viewer, keyboard navigation |
| **Team** | 4-member cards with hover social links |
| **Contact** | Working email form via Formspree, contact details, social links |

---

## Stack

- **Pure HTML5 / CSS3 / Vanilla JS** — zero dependencies, zero build step
- **Google Fonts** — Inter + Playfair Display
- **Formspree** — serverless email delivery
- **Unsplash** — placeholder images (swap with your own)

---

## Quick start

```bash
# Clone / download the repo, then open locally:
open index.html

# Or serve with Python's built-in server:
python3 -m http.server 8080
```

---

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch` → `main` → `/ (root)`.
4. Your site will be live at `https://<username>.github.io/<repo>/`.

---

## Customisation

### Replace images
Swap every `images.unsplash.com` URL with your own hosted images. Recommended sizes:
- Hero: `1200×800px`
- Gallery: `800×600px`
- Team portraits: `400×400px` (square, faces centred)

### Contact form
The form currently points to a placeholder Formspree endpoint. To activate real email delivery:
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy your endpoint URL
3. Replace the `action` attribute in `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Colours
All design tokens live in `:root` in `styles.css`. The primary palette:

```css
--blue-600: #2563eb;   /* primary accent */
--blue-50:  #eff6ff;   /* light tint */
--gray-900: #0f172a;   /* headings */
```

---

## File structure

```
landing/
├── index.html   — markup, all 5 sections
├── styles.css   — design tokens, layout, animations
├── script.js    — scroll effects, counter, gallery filter, lightbox, form
└── README.md    — this file
```

---

## Browser support

Chrome 90+, Firefox 90+, Safari 14+, Edge 90+. Uses `IntersectionObserver`, CSS custom properties, `backdrop-filter`, and `fetch` — all broadly supported with no polyfills needed for modern browsers.

---

*Built with care · MIT licence*
