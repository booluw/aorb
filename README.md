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

## Tech stack

- **Vue 3** with `<script setup>` and Composition API
- **Vue Router 4** (history mode, clean `/r/:slug` URLs)
- **Tailwind CSS 4** via Vite plugin
- **canvas-confetti** for the celebration burst
- No backend — all state is in the URL slug and `localStorage`

## Coauthors

- Booluw (Human)
- Claude (Agent)
