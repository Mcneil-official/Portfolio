# Jhon Mcneil Magtibay Portfolio

A responsive single-page developer portfolio built with plain HTML, CSS, and JavaScript.

The app is data-driven: content is loaded from `data.json` and rendered by `main.js`, so you can update most portfolio details without editing HTML.

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5 (CDN)

## Project Structure
```text
Portfolio/
|- index.html
|- styles.css
|- main.js
|- data.json
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
- Projects
- Education
- Achievements
- Contact Form

## Local Development
Use a local HTTP server so `fetch('data.json')` works correctly.

### Windows PowerShell
```powershell
cd "C:\Users\Jhon Mcneil Magtibay\Desktop\Try\Portfolio"
python -m http.server 8000
```

Then open:
- `http://localhost:8000`

## Customize Content (`data.json`)
You can edit these keys safely:
- `name`, `title`, `about`
- `full-body-pic`, `avatar`
- `chips[]`
- `skills[]`
- `experiences[]`
- `education[]`
- `projects[]`
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
	"image": "images/projects/project-image.png"
}
```

## Performance Notes
- Hero image is preloaded in `index.html`.
- Loader behavior is handled in `main.js`.
- Mobile layout uses compact and ultra-compact responsive rules in `styles.css`.
- Optimized images (such as `fullbody-optimized.png`) can be used to improve load performance.

## Deployment
You can deploy this as a static site using:
- GitHub Pages
- Netlify
- Vercel

After deployment, update canonical/social metadata in `index.html` to use your final production URL.

## License
Personal portfolio project. Reuse structure with attribution.
