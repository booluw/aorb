<script setup>
const question = ref('')
const optionA = ref('')
const optionB = ref('')
const waNumber = ref('')
const shareUrl = ref('')
const copied = ref(false)

function generate() {
  if (!optionA.value.trim() || !optionB.value.trim() || !waNumber.value.trim()) return

  const slug = encode({
    a: optionA.value.trim(),
    b: optionB.value.trim(),
    w: waNumber.value.trim().replace(/[^0-9+]/g, ''),
    q: question.value.trim(),
  })

  shareUrl.value = `${window.location.origin}/r/${slug}`
  copied.value = false
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    const input = document.createElement('input')
    input.value = shareUrl.value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}
</script>

<template>
  <div class="mx-auto flex min-h-[calc(100vh-64px)] max-w-lg flex-col items-center justify-center px-6 py-12">
    <div class="mb-8 text-center">
      <h1 class="mb-2 text-4xl font-black text-stone-900">Create a pick</h1>
      <p class="text-stone-400">Two options. One choice. Share it with someone.</p>
    </div>

    <div class="w-full space-y-4">
      <div>
        <label class="mb-1.5 flex items-center gap-2 text-sm font-bold text-stone-700">
          <span class="text-base">❓</span>
          Question
          <span class="ml-auto text-xs font-normal text-stone-400">{{ question.length }}/20</span>
        </label>
        <input
          v-model="question"
          maxlength="20"
          placeholder="e.g. What's for dinner?"
          class="w-full rounded-2xl border-2 border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-300 focus:border-stone-400"
          @keydown.enter="generate"
        />
      </div>

      <div>
        <label class="mb-1.5 flex items-center gap-2 text-sm font-bold text-stone-700">
          <span class="flex h-6 w-6 items-center justify-center rounded-md bg-stone-300 text-xs font-bold text-white">A</span>
          Option
        </label>
        <input
          v-model="optionA"
          placeholder="e.g. Pizza for dinner"
          class="w-full rounded-2xl border-2 border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-300 focus:border-stone-400"
          @keydown.enter="generate"
        />
      </div>

      <div>
        <label class="mb-1.5 flex items-center gap-2 text-sm font-bold text-stone-700">
          <span class="flex h-6 w-6 items-center justify-center rounded-md bg-stone-300 text-xs font-bold text-white">B</span>
          Option
        </label>
        <input
          v-model="optionB"
          placeholder="e.g. Sushi for dinner"
          class="w-full rounded-2xl border-2 border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-300 focus:border-stone-400"
          @keydown.enter="generate"
        />
      </div>

      <div>
        <label class="mb-1.5 flex items-center gap-2 text-sm font-bold text-stone-700">
          <svg class="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp Number
        </label>
        <input
          v-model="waNumber"
          type="tel"
          placeholder="e.g. +1234567890"
          class="w-full rounded-2xl border-2 border-stone-200 px-4 py-3 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-300 focus:border-stone-400"
          @keydown.enter="generate"
        />
      </div>

      <button
        class="w-full rounded-2xl bg-stone-800 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-stone-200 transition-all hover:bg-stone-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!optionA.trim() || !optionB.trim() || !waNumber.trim()"
        @click="generate"
      >
        Generate Link
      </button>
    </div>

    <div
      v-if="shareUrl"
      class="mt-8 w-full rounded-2xl border border-stone-200 bg-stone-50 p-5 transition-all"
    >
      <p class="mb-2 text-xs font-semibold text-stone-500">Share this link</p>
      <p class="mb-3 break-all rounded-xl bg-white px-3 py-2.5 text-sm text-stone-700 shadow-sm">
        {{ shareUrl }}
      </p>
      <button
        class="w-full rounded-xl bg-stone-800 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-stone-900 active:scale-[0.98]"
        @click="copyLink"
      >
        {{ copied ? 'Copied!' : 'Copy Link' }}
      </button>
    </div>
  </div>
</template>
