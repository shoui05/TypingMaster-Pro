# TypeWarrior ⚔️

Typing game + speed test where you fight your shadow with every keystroke.
Correct keys charge your attacks, mistakes make the shadow strike back, and a short run of clean typing blocks its hits.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm test         # API validation tests
npm run build    # production build -> dist/
```

## Deploy (GitHub -> Vercel)
```bash
git init && git add . && git commit -m "TypeWarrior"
git remote add origin <your-repo-url> && git push -u origin main
```
Import the repo in Vercel. Framework preset: Vite (already set in `vercel.json`).

## Online leaderboard (optional)
`/api/leaderboard` needs Redis. In Vercel: Storage -> Marketplace -> Upstash Redis -> connect to the project.
It sets `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically. Without them the API answers 503 and the app keeps working.
Scores are client-reported, so the server only checks plausibility (WPM cap, min duration). Treat it as casual, not tamper-proof.

## Structure
```
index.html            app markup
src/styles/main.css   all styling (Vite-processed)
public/js/app.js      typing engine, texts, history, results
public/js/fight.js    canvas shadow-fight layer (reads live test state)
public/sw.js          offline cache (PWA)
public/manifest.webmanifest, icon.svg
api/leaderboard.js    serverless leaderboard
tests/                node --test
```
