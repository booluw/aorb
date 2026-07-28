<script setup>
defineProps({
  side: { type: String, required: true },
  label: { type: String, required: true },
  status: {
    type: String,
    default: 'hidden',
    validator: (v) => ['hidden', 'locked', 'chosen', 'chosen-answered', 'peek'].includes(v),
  },
  waNumber: { type: String, default: '' },
})

const emit = defineEmits(['choose', 'sendWp'])
</script>

<template>
  <div class="perspective w-full max-w-sm">
    <div
      class="relative h-72 cursor-pointer select-none"
      :class="status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'"
      @click="
        () => {
          if (status === 'hidden') emit('choose', side)
        }
      "
    >
      <!-- front: letter only -->
      <div
        class="absolute inset-0 rounded-3xl border-2 border-stone-200 bg-white shadow-lg transition-all duration-500 backface-hidden flex items-center justify-center hover:-translate-y-2 hover:shadow-xl"
        :class="[
          status === 'hidden' || status === 'locked'
            ? 'opacity-100 rotate-y-0'
            : 'opacity-0 -rotate-y-180 pointer-events-none',
          status === 'locked' ? 'opacity-60 hover:translate-y-0 hover:shadow-lg' : '',
        ]"
      >
        <span class="text-8xl font-black text-stone-200">
          {{ side }}
        </span>
        <div
          v-if="status === 'locked'"
          class="absolute inset-0 bg-white/60 rounded-3xl flex items-center justify-center"
        >
          <span class="rounded-full bg-stone-800/10 px-4 py-2 text-sm font-medium text-stone-400">
            Pick the other option first
          </span>
        </div>
      </div>

      <!-- back: content -->
      <div
        class="absolute inset-0 rounded-3xl border-2 bg-white shadow-lg transition-all duration-500 backface-hidden flex flex-col p-6"
        :class="[
          status === 'hidden' || status === 'locked'
            ? 'opacity-0 rotate-y-180 pointer-events-none'
            : 'opacity-100 rotate-y-0',
          status === 'peek'
            ? 'border-stone-200'
            : 'border-rose-300 shadow-rose-100',
        ]"
      >
        <div class="flex-1 flex flex-col items-center justify-center text-center">
          <span
            class="text-xs font-bold uppercase tracking-widest mb-2"
            :class="status === 'peek' ? 'text-stone-300' : 'text-rose-500'"
          >
            Option {{ side }}
          </span>
          <p class="text-lg font-medium text-stone-800 leading-relaxed">
            {{ label }}
          </p>
        </div>

        <button
          v-if="status === 'chosen'"
          class="mt-auto w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-[0.97]"
          @click.stop="emit('sendWp', side)"
        >
          Send via WhatsApp
        </button>

        <div
          v-else-if="status === 'chosen-answered'"
          class="mt-auto w-full rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-500 text-center"
        >
          &#10003; Picked via WhatsApp
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective {
  perspective: 1000px;
}

.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.rotate-y-0 {
  transform: rotateY(0deg);
}

.-rotate-y-180 {
  transform: rotateY(-180deg);
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
