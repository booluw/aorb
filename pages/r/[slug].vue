<script setup>
import confetti from 'canvas-confetti'
import html2canvas from 'html2canvas'

const route = useRoute()

const data = ref(null)
const error = ref(false)
const chosen = ref(null)
const answered = ref(false)
const slug = route.params.slug
const capturing = ref(false)

const captureCardEl = ref(null)

if (slug) {
  try {
    const decoded = decode(slug)
    if (decoded && decoded.a && decoded.b && decoded.w) {
      data.value = decoded
    } else {
      error.value = true
    }
  } catch {
    error.value = true
  }
} else {
  error.value = true
}

useHead({
  title: () => data.value?.q || "What's your pick?",
  meta: [
    { property: 'og:title', content: () => data.value?.q || "What's your pick?" },
    { property: 'og:description', content: () =>
      data.value ? `A: ${data.value.a}  ·  B: ${data.value.b}` : '' },
    { name: 'description', content: () =>
      data.value ? `A: ${data.value.a}  ·  B: ${data.value.b}` : '' },
  ],
})

const storageKey = `pickt_${slug}`
const pendingKey = `pickt_pending_${slug}`
const showCheatModal = ref(false)

function beforeUnloadHandler(e) {
  e.preventDefault()
  e.returnValue = ''
}

const cardStatus = (side) => {
  if (!data.value) return 'hidden'
  if (chosen.value === side && answered.value) return 'chosen-answered'
  if (chosen.value === side) return 'chosen'
  if (chosen.value && answered.value) return 'peek'
  if (chosen.value && chosen.value !== side) return 'locked'
  return 'hidden'
}

function onChoose(side) {
  if (chosen.value) return
  chosen.value = side
  sessionStorage.setItem(pendingKey, side)
  window.addEventListener('beforeunload', beforeUnloadHandler)
}

async function onSendWp(side) {
  if (!data.value) return

  capturing.value = true
  await nextTick()

  const number = data.value.w.replace(/[^0-9]/g, '')
  const text = encodeURIComponent(`I pick ${side}: ${data.value[side.toLowerCase()]}`)

  try {
    if (captureCardEl.value) {
      const canvas = await html2canvas(captureCardEl.value, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 400,
        height: 520,
      })

      const blob = await new Promise((r) => canvas.toBlob(r, 'image/png'))
      const file = new File([blob], 'pickt-card.png', { type: 'image/png' })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My pick',
          text: `I picked ${side}!`,
        })
      } else {
        window.open(URL.createObjectURL(blob), '_blank')
      }
    }
  } catch {
    // share failed or dismissed — fall through to WhatsApp text
  }

  window.open(`https://wa.me/${number}?text=${text}`, '_blank')

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#F43F5E', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
  })

  answered.value = true
  capturing.value = false
  localStorage.setItem(storageKey, side)
  sessionStorage.removeItem(pendingKey)
  window.removeEventListener('beforeunload', beforeUnloadHandler)
}

onMounted(() => {
  const saved = localStorage.getItem(storageKey)
  if (saved) {
    chosen.value = saved
    answered.value = true
    return
  }

  const pending = sessionStorage.getItem(pendingKey)
  if (pending) {
    chosen.value = pending
    showCheatModal.value = true
    window.addEventListener('beforeunload', beforeUnloadHandler)
  }
})
</script>

<template>
  <div class="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col items-center px-6 py-12">
    <template v-if="error">
      <div class="mt-20 text-center">
        <div class="mb-4 text-5xl">😕</div>
        <h2 class="mb-2 text-2xl font-black text-stone-900">This pick doesn't exist</h2>
        <p class="mb-8 text-stone-400">The link might be wrong or expired.</p>
        <NuxtLink
          to="/"
          class="inline-block rounded-2xl bg-stone-800 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-stone-900"
        >
          Create your own pick
        </NuxtLink>
      </div>
    </template>

    <template v-else-if="data">
      <h1 class="mb-2 text-center text-3xl font-black text-stone-900">{{ data.q || "What's your pick?" }}</h1>
      <p v-if="!chosen" class="mb-10 text-stone-400">Tap a card to reveal the options</p>
      <p v-else-if="chosen && !answered" class="mb-10 text-stone-400">
        Send your pick via WhatsApp to see what you missed
      </p>
      <p v-else class="mb-10 text-stone-400">
        You picked <strong class="text-stone-700">{{ chosen }}</strong>. Now see the other option!
      </p>

      <div class="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:items-stretch">
        <ChallengeCard
          side="A"
          :label="data.a"
          :status="cardStatus('A')"
          :wa-number="data.w"
          @choose="onChoose"
          @send-wp="onSendWp"
        />
        <ChallengeCard
          side="B"
          :label="data.b"
          :status="cardStatus('B')"
          :wa-number="data.w"
          @choose="onChoose"
          @send-wp="onSendWp"
        />
      </div>

      <p v-if="chosen && !answered" class="mt-10 text-center text-xs text-stone-300">
        Don't worry — the other option stays hidden until you send.
      </p>
    </template>

    <div v-else class="mt-20">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div>
    </div>

    <!-- capture card (off-screen, rendered for html2canvas) -->
    <div
      ref="captureCardEl"
      class="fixed left-[-9999px] top-0 w-[400px] overflow-hidden rounded-3xl border border-stone-100 bg-white"
      style="height: 520px"
    >
      <div class="flex h-full flex-col">
        <!-- colored stripe -->
        <div
          class="h-1.5 w-full shrink-0"
          :class="chosen === 'A' ? 'bg-amber-400' : 'bg-violet-500'"
        />

        <!-- question -->
        <div class="flex flex-col items-center justify-center px-10 pt-10 pb-6 text-center">
          <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-50 text-3xl leading-none">
            ❓
          </div>
          <p class="text-2xl font-black text-stone-900 leading-[1.2]">
            {{ data?.q || "What's your pick?" }}
          </p>
        </div>

        <div class="mx-10 border-t border-stone-100" />

        <!-- result -->
        <div class="flex flex-1 flex-col items-center justify-center px-10 text-center">
          <span class="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-stone-400">I PICKED</span>
          <div
            class="inline-flex items-center gap-4 rounded-2xl px-6 py-4"
            :class="chosen === 'A' ? 'bg-amber-50' : 'bg-violet-50'"
          >
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl font-black text-white leading-none"
              :class="chosen === 'A' ? 'bg-amber-400' : 'bg-violet-500'"
            >
              {{ chosen }}
            </span>
            <span class="text-xl font-bold text-stone-800 leading-snug">
              {{ chosen === 'A' ? data?.a : data?.b }}
            </span>
          </div>
        </div>

        <!-- footer -->
        <div class="flex items-center justify-center gap-2 border-t border-stone-100 px-10 py-6">
          <svg width="48" height="16" viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0 opacity-30">
            <rect x="0" y="4" width="44" height="56" rx="11" fill="#F59E0B" />
            <rect x="24" y="4" width="44" height="56" rx="11" fill="#7C3AED" />
            <text x="20.5" y="44" font-family="system-ui, sans-serif" font-size="30" font-weight="900" fill="white" text-anchor="middle">A</text>
            <text x="44.5" y="44" font-family="system-ui, sans-serif" font-size="30" font-weight="900" fill="white" text-anchor="middle">B</text>
            <text x="82" y="44" font-family="system-ui, sans-serif" font-size="34" font-weight="800" fill="#1C1917" letter-spacing="-1">pickt</text>
          </svg>
          <span class="text-xs font-medium text-stone-300">pickt</span>
        </div>
      </div>
    </div>

    <!-- loading overlay -->
    <div
      v-if="capturing"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/80"
    >
      <div class="text-center">
        <div class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"></div>
        <p class="text-sm font-medium text-stone-500">Generating your card...</p>
      </div>
    </div>

    <!-- Cheater modal -->
    <div
      v-if="showCheatModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div class="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div class="mb-3 text-5xl">👀</div>
        <h2 class="mb-2 text-2xl font-black text-stone-900">Nice try, cheater.</h2>
        <p class="mb-1 text-stone-500">
          You already peeked at <strong class="text-stone-700">Option {{ chosen }}</strong>.
        </p>
        <p class="mb-6 text-stone-500">
          No reloading your way out of this one. Send it or admit defeat.
        </p>
        <button
          class="rounded-2xl bg-stone-800 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-stone-900"
          @click="showCheatModal = false"
        >
          I'll send it, relax
        </button>
      </div>
    </div>
  </div>
</template>
