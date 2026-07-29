<script setup>
const showHowTo = ref(false)

useHead({
  titleTemplate: (chunk) => (chunk ? `${chunk} · Pickt` : 'Pickt — Make the call.'),
})
</script>

<template>
  <div class="min-h-screen bg-stone-50">
    <header class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <NuxtLink to="/" class="flex items-center gap-2 no-underline">
        <svg
          width="100" height="32" viewBox="0 0 200 64" fill="none"
          xmlns="http://www.w3.org/2000/svg" class="shrink-0"
        >
          <rect x="0" y="4" width="44" height="56" rx="11" fill="#F59E0B" />
          <rect x="24" y="4" width="44" height="56" rx="11" fill="#7C3AED" />
          <text
            x="20.5" y="44" font-family="system-ui, sans-serif"
            font-size="30" font-weight="900" fill="white" text-anchor="middle"
          >A</text>
          <text
            x="44.5" y="44" font-family="system-ui, sans-serif"
            font-size="30" font-weight="900" fill="white" text-anchor="middle"
          >B</text>
          <text
            x="82" y="44" font-family="system-ui, sans-serif"
            font-size="34" font-weight="800" fill="#1C1917" letter-spacing="-1"
          >pickt</text>
        </svg>
      </NuxtLink>

      <button
        class="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-sm font-bold text-stone-400 transition-colors hover:border-stone-300 hover:text-stone-600"
        aria-label="How to use Pickt"
        @click="showHowTo = true"
      >
        ?
      </button>
    </header>

    <NuxtPage />

    <!-- How to modal -->
    <div
      v-if="showHowTo"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      @click.self="showHowTo = false"
    >
      <div class="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl font-black text-stone-900">How Pickt works</h2>
          <button
            class="flex h-7 w-7 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
            @click="showHowTo = false"
          >
            ✕
          </button>
        </div>

        <div class="space-y-5">
          <div class="flex gap-4">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">1</span>
            <div>
              <p class="font-semibold text-stone-800">Write your question</p>
              <p class="text-sm text-stone-400">Enter a question and two options — like the two folded papers in the real game.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600">2</span>
            <div>
              <p class="font-semibold text-stone-800">Add your WhatsApp</p>
              <p class="text-sm text-stone-400">Your number is encoded in the link — the picker will send their choice directly to you.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-200 text-xs font-bold text-stone-600">3</span>
            <div>
              <p class="font-semibold text-stone-800">Share the link</p>
              <p class="text-sm text-stone-400">Send it to anyone. They see two identical cards and pick one blindly — just like real life.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">4</span>
            <div>
              <p class="font-semibold text-stone-800">Get their pick</p>
              <p class="text-sm text-stone-400">A WhatsApp message arrives with their choice. The other option stays hidden until they commit.</p>
            </div>
          </div>
        </div>

        <button
          class="mt-8 w-full rounded-2xl bg-stone-800 py-3 text-sm font-bold text-white transition-colors hover:bg-stone-900"
          @click="showHowTo = false"
        >
          Got it
        </button>
      </div>
    </div>
  </div>
</template>
