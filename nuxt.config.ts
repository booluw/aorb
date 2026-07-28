export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: 'netlify',
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2026-07-29',
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect x='5' y='15' width='42' height='70' rx='10' fill='%23F59E0B'/><rect x='53' y='15' width='42' height='70' rx='10' fill='%237C3AED'/><text x='26' y='60' font-family='system-ui' font-size='36' font-weight='900' fill='white' text-anchor='middle'>A</text><text x='74' y='60' font-family='system-ui' font-size='36' font-weight='900' fill='white' text-anchor='middle'>B</text></svg>",
        },
      ],
    },
  },
})
