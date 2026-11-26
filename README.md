# SayRight

SayRight is a static English pronunciation practice app. It compares British and American pronunciations, offers tricky-word practice, and provides a reader for pasted text or uploaded documents.

## Run locally

No build step or package installation is required. From the repository root, start a local web server:

```sh
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000). Serving the page over HTTP allows browser requests to Wikimedia Commons to work; opening `index.html` directly may block those requests.

## Features

- Compare 28 common words and filter by category.
- Practice 24 tricky pronunciations.
- Paste English text or upload a text-based PDF / `.txt` file, then click words or use the sequential reader.
- Choose UK or US voice profiles and adjust playback speed.
- Switch between Light, Midnight, and Warm Paper themes; the selected theme is saved in the browser.
- Play dialect-tagged recordings from Wikimedia Commons when available, with a matching browser voice as an optional fallback.

Voice profiles are not recordings of six bundled actors. Commons audio is selected by dialect, not by profile; profiles select a matching voice from the voices available in the user's browser when fallback speech is used. Which voices are available depends on the operating system and browser.

## Dependencies and limitations

The app is implemented in `index.html` and has no build-time dependencies. Tailwind CSS, PDF.js, and fonts load from external CDNs; Wikimedia Commons is queried for audio at runtime. These features require network access. The English-language check is a lightweight heuristic, and scanned/image-only PDFs are not OCR'd.

The project plan in `pronunciation_practice_web_app_complete_project_plan.md` describes a possible future architecture; it is not the current implementation.

## Validation

Use Node.js 20 or newer to syntax-check every inline script:

```sh
node scripts/check-inline-js.mjs
```

The same check runs in GitHub Actions on pushes to `main` and pull requests targeting `main`.

## Deployment

GitHub Pages is configured to publish the repository's `main` branch from its root. Pushes to `main` publish the static app at <https://aljahedofficial.github.io/SayRight/>.
