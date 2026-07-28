<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import confetti from 'canvas-confetti'
import { decode } from '../utils/encode.js'
import ChallengeCard from '../components/ChallengeCard.vue'

const route = useRoute()
const router = useRouter()

const data = ref(null)
const chosen = ref(null)
const answered = ref(false)
const error = ref(false)

const storageKey = computed(() => `pickt_${route.params.slug}`)

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
}

function onSendWp(side) {
  if (!data.value) return

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#F43F5E', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'],
  })

  const number = data.value.w.replace(/[^0-9]/g, '')
  const text = encodeURIComponent(`I pick ${side}: ${data.value[side.toLowerCase()]}`)
  window.open(`https://wa.me/${number}?text=${text}`, '_blank')
  answered.value = true
  localStorage.setItem(storageKey.value, side)
}

onMounted(() => {
  const slug = route.params.slug
  if (!slug) {
    error.value = true
    return
  }

  const decoded = decode(slug)
  if (!decoded || !decoded.a || !decoded.b || !decoded.w) {
    error.value = true
    return
  }

  data.value = decoded

  const saved = localStorage.getItem(storageKey.value)
  if (saved) {
    chosen.value = saved
    answered.value = true
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
        <router-link
          to="/"
          class="inline-block rounded-2xl bg-stone-800 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-stone-900"
        >
          Create your own pick
        </router-link>
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
  </div>
</template>
