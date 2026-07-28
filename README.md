<svg viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="200" height="64">
  <rect x="0" y="4" width="44" height="56" rx="11" fill="#F59E0B" />
  <rect x="24" y="4" width="44" height="56" rx="11" fill="#7C3AED" />
  <text x="20.5" y="44" font-family="system-ui, sans-serif" font-size="30" font-weight="900" fill="white" text-anchor="middle">A</text>
  <text x="44.5" y="44" font-family="system-ui, sans-serif" font-size="30" font-weight="900" fill="white" text-anchor="middle">B</text>
  <text x="82" y="44" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#1C1917" letter-spacing="-1">pickt</text>
</svg>

# Pickt — Make the call.

A digital version of the classic paper-slip game. You know the one — you write two options on separate pieces of paper, fold them up so they look identical, and someone picks one blindly. Whatever's written on it is their fate.

**Pickt** brings that same suspense to your phone. No backend, no sign-ups, just a link that works.

## How it works

### Asker (creating a pick)
1. Enter **Option A**, **Option B**, and your **WhatsApp number**
2. Get a link — the options are encoded (XOR + base64) directly in the URL slug
3. Share the link with someone

### Picker (answering)
1. Open the link — two identical cards appear (A and B)
2. Tap one — it flips to reveal what's written, the other card locks
3. Click **Send via WhatsApp** — it opens `wa.me/<your number>` with a pre-filled message saying which option they picked
4. Confetti bursts 🎉
5. Now they can flip the other card to see what they missed (but the WhatsApp button is disabled — no take-backs)

### Anti-cheat
- Once you send via WhatsApp, the slug is saved in `localStorage` — you can't answer the same pick twice
- The other card is locked until you commit
- On return visits, the page restores your previous choice
- If you try to reload after peeking but before sending, a browser warning stops you — and `sessionStorage` catches the attempt, showing a sarcastic modal

## Tech stack

- **Nuxt 4** (Vue 3 SSR framework, file-based routing)
- **Tailwind CSS 3** via the `@nuxtjs/tailwindcss` module
- **canvas-confetti** for the celebration burst
- **Nitro** (Nuxt server engine) with **Netlify** preset — serverless SSR
- No database — all state is in the URL slug, `localStorage`, and `sessionStorage`

## Deploy on Netlify (free plan)

1. Push this repository to GitHub / GitLab
2. Log in to [Netlify](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Pick your repository (make sure you're on the `nuxt-ssr` branch)
4. Build command: `npm run build`
5. Publish directory: `.output/public`
6. Click **Deploy**

No environment variables or extra config needed. The Nitro Netlify preset generates the serverless function automatically — all `/r/:slug` routes are handled by the function, no 404s.

## Coauthors

- Booluw (Human)
- Claude (Agent)
