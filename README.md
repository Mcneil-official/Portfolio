# Jhon Mcneil Magtibay Portfolio

A responsive multi-page developer portfolio with a light theme, built with HTML, Tailwind CSS, and vanilla JavaScript.

The app is data-driven: content is loaded from `data.json` and rendered by `main.js`, so you can update most portfolio details without editing HTML.

## Pages
- `index.html` — homepage with hero, about, experience, skills, featured projects carousel, education, achievements, and contact form.
- `projects.html` — full grid of all projects.
- `certificates.html` — certificates grid with a lightbox modal.

## Tech Stack
- HTML5
- Tailwind CSS 3 (compiled via npm CLI)
- Vanilla JavaScript
- Native HTML `<dialog>` for the project/certificate modals

## Project Structure
```text
Portfolio/
|- index.html
|- projects.html
|- certificates.html
|- layout.js           (shared sidebar/loader/footer/modal chrome)
|- main.js
|- data.json
|- input.css
|- tailwind.config.js
|- package.json
|- styles.css          (compiled Tailwind output — committed for static hosting)
|- images/
    |- fullbody.png
    |- fullbody-optimized.png
    |- projects/
```

## Sections Included
- Hero
- About
- Experience
- Skills
- Projects (featured carousel on home, full grid on `projects.html`)
- Education
- Achievements
- Certificates (on `certificates.html`)
- Contact Form

## Local Development

### 1. Build Tailwind CSS (after first clone or when classes change)
```powershell
cd "C:\Users\Jhon Mcneil Magtibay\Desktop\Try\Portfolio"
npm install
npm run build
```

### 2. Serve the site (so `fetch('data.json')` works correctly)
```powershell
python -m http.server 8000
```

Then open:
- `http://localhost:8000`

During development you can watch for changes:
```powershell
npm run watch
```

## Customize Content (`data.json`)
You can edit these keys safely:
- `name`, `title`, `about`
- `full-body-pic`, `avatar`
- `chips[]`
- `skills[]`
- `experiences[]`
- `education[]`
- `projects[]` (add `"featured": true` to a project to include it in the homepage carousel)
- `certificates[]`
- `notableAchievements[]`
- `contact` (email/social links)

### Project Object Example
```json
{
	"title": "Project Name",
	"description": "Short summary",
	"languages": ["JavaScript", "Node.js"],
	"repository": "https://github.com/username/repo",
	"deployment": "https://your-demo-url.com",
	"image": "images/projects/project-image.png",
	"featured": true
}
```

### Certificate Object Example
```json
{
	"title": "Certificate Title",
	"issuer": "Organization",
	"year": "2025",
	"description": "Short summary",
	"image": "https://example.com/certificate.png",
	"credentialUrl": "https://example.com/verify"
}
```

## Performance Notes
- Hero image is preloaded in `index.html`.
- Loader behavior is handled in `main.js`.
- `styles.css` is compiled with `--minify` and committed so GitHub Pages works without a build step.
- If you change Tailwind classes, run `npm run build` to regenerate `styles.css`.

## Deployment
You can deploy this as a static site using:
- GitHub Pages
- Netlify
- Vercel

After deployment, update canonical/social metadata in `index.html` to use your final production URL.

## License
Personal portfolio project. Reuse structure with attribution.