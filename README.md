# Personal Portfolio (HTML/CSS/JS)

This is a simple, modern, responsive personal portfolio scaffold built with plain HTML, CSS, and JavaScript (no frameworks).

Files:
- `index.html` — main page
- `style.css` — styles using CSS variables, Flexbox/Grid
- `script.js` — smooth scroll, animations, contact form validation, modal
- `assets/` — placeholder images (SVGs)

How to use:
1. Open `index.html` in your browser.
2. Replace `assets/profile.svg` with your photo, and add a real `assets/resume.pdf` to enable preview.
3. Edit text content, project entries, and links to point to your GitHub and live demos.

Notes:
- The "Download Resume" button currently generates a placeholder blob for demo purposes. Add a real PDF at `assets/resume.pdf` to use a static file instead.
- The contact form is client-side only. Hook it up to your server or an email service (Formspree, Netlify, etc.) for production.

Customize colors by editing CSS variables in `style.css`.