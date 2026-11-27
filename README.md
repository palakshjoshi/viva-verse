# VivaVerse — built from scratch for Netlify

### Included
Responsive React dashboard, subject/difficulty picker, live viva flow, answer feedback/score, demo question fallback, and Netlify Function for Gemini.

### Deploy
1. Extract this ZIP.
2. Create a GitHub repository and upload the files/folders from this project.
3. In Netlify choose Add new site → Import an existing project → GitHub → select repository.
4. Build command `npm run build`, publish directory `dist` (already set in netlify.toml).
5. Deploy. Gemini is connected through Netlify AI Gateway, which supplies credentials automatically — no API key needed.
6. Optional: to use your own Google key instead, add a `GEMINI_API_KEY` environment variable on Netlify (never in frontend files or commits) and redeploy.

AI calls run in the `viva` Netlify Function using the official `@google/genai` SDK (model `gemini-flash-latest`). If a call fails, the UI falls back to built-in demo questions.
