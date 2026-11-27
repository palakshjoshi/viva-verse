# VivaVerse — built from scratch for Netlify

### Included
Responsive React dashboard, subject/difficulty picker, live viva flow, answer feedback/score, demo question fallback, and Netlify Function for Gemini.

### Deploy
1. Extract this ZIP.
2. Create a GitHub repository and upload the files/folders from this project.
3. In Netlify choose Add new site → Import an existing project → GitHub → select repository.
4. Build command `npm run build`, publish directory `dist` (already set in netlify.toml).
5. In Netlify Site configuration → Environment variables add `GEMINI_API_KEY` with your API key. Never put the key in frontend files or commit it.
6. Deploy/redeploy.

AI requires a valid Gemini API key and applicable API access/quotas. Without it, the UI still loads but AI calls show a configuration message.
