# Tina Yuting Huang — Faculty Candidate Website

Academic website for Tina Yuting Huang, Ph.D., built with Jekyll and deployed to GitHub Pages from the repository's `master` branch.

Expected GitHub Pages URL: `https://tinayutingh0001-stack.github.io/tina_yuting_huang.github.io/`

## Site structure

- `index.html` — combined homepage, research vision, and CV download
- `research.html` — compatibility redirect to the homepage research section
- `publications.html` — verified publication records and filter controls
- `teaching-mentoring.html` — concise mentoring approach and selected outcomes
- `cv.html` — compatibility redirect to the homepage CV section
- `contact.html` — professional contact information
- `assets/images/*.svg` — editable conceptual scientific illustrations
- `assets/css/candidate.scss` — site design and responsive styles
- `assets/js/site.js` — mobile navigation, publication filters, and progressive reveal
- `files/Tina_Yuting_Huang_CV.pdf` — stable, public-safe CV download
- `HANDOFF.md` — unresolved factual details and verification notes

## Update content

### Text and research projects

Edit the corresponding root HTML file. Internal URLs and assets should use Jekyll's `relative_url` filter so they continue to work under the project path:

```liquid
{{ '/#research' | relative_url }}
{{ '/assets/images/example.svg' | relative_url }}
```

### Publications

Each record is one `<article class="publication">` in `publications.html`. Preserve the complete author order, bold `<strong>Huang Y</strong>`, keep `+` for equal contribution, and keep `†` for undergraduate mentees. Published work should use verified DOI or publisher links. Works in preparation remain unlinked until a public preprint or publisher record becomes available.

Filter membership is controlled by the space-separated `data-category` value, for example:

```html
<article class="publication" data-publication data-category="published lead">
```

### Figures

The supplied visuals are editable SVG files in `assets/images/`. Preserve scientific distinctions among LNPs, vesicles, hydrogels, and polymer-shell particles. Label new conceptual illustrations clearly and do not add simulated data as experimental evidence.

### CV

Replace `files/Tina_Yuting_Huang_CV.pdf` with the new public-facing PDF using the same filename. The navigation and download buttons will update automatically. Before publishing a replacement, remove personal contact details and private or unavailable preview links that should not be public.

## Local preview

Use a current Ruby version supported by Jekyll 4.4, then run:

```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --baseurl /tina_yuting_huang.github.io
```

Open `http://localhost:4000/tina_yuting_huang.github.io/`.

Production check:

```bash
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter
```

## Deployment

`.github/workflows/jekyll.yml` builds and deploys the site on pushes to `master`. In repository settings, GitHub Pages should use **GitHub Actions** as the source. The workflow receives the Pages base path from `actions/configure-pages`, so assets and nested routes are built under `/tina_yuting_huang.github.io/` exactly once.
