<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-stone-50">
    <header class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <RouterLink to="/" class="flex items-center gap-2 no-underline">
        <svg width="100" height="32" viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
          <rect x="0" y="4" width="44" height="56" rx="11" fill="#F59E0B" />
          <rect x="24" y="4" width="44" height="56" rx="11" fill="#7C3AED" />
          <text x="20.5" y="44" font-family="system-ui, sans-serif" font-size="30" font-weight="900" fill="white" text-anchor="middle">A</text>
          <text x="44.5" y="44" font-family="system-ui, sans-serif" font-size="30" font-weight="900" fill="white" text-anchor="middle">B</text>
          <text x="82" y="44" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#1C1917" letter-spacing="-1">pickt</text>
        </svg>
      </RouterLink>
    </header>
    <RouterView />
  </div>
</template>
