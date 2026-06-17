<!-- components/UI/Modal.vue -->
<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  description?: string
  persistent?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  persistent: false,
  maxWidth: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => {
  if (!props.persistent) emit('update:modelValue', false)
}

// ── Drag-to-dismiss (mobile drawer) ──────────────────────────────────
const dragY = ref(0)
const startY = ref(0)
const isDragging = ref(false)
const isClosingFromDrag = ref(false)
const DISMISS_THRESHOLD = 120

function onTouchStart(e: TouchEvent) {
  if (!e.touches[0]) return
  startY.value = e.touches[0].clientY
  isDragging.value = true
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value || !e.touches[0]) return
  const delta = e.touches[0].clientY - startY.value
  dragY.value = Math.max(0, delta)
}

function onTouchEnd() {
  isDragging.value = false
  if (dragY.value >= DISMISS_THRESHOLD) {
    isClosingFromDrag.value = true
    emit('update:modelValue', false)
    // push past viewport height so the CSS transition slides it fully off-screen
    nextTick(() => {
      dragY.value = window.innerHeight
    })
  } else {
    dragY.value = 0
  }
}

const dragStyle = computed(() => {
  if (isClosingFromDrag.value) {
    // let CSS transition smoothly continue from current drag position to 100%
    return {
      transform: `translateY(${dragY.value}px)`,
      transition: 'transform 220ms ease-in, opacity 220ms ease-in',
    }
  }
  return dragY.value > 0
    ? { transform: `translateY(${dragY.value}px)`, transition: 'none' }
    : {}
})

function resetDragState() {
  dragY.value = 0
  isClosingFromDrag.value = false
}

watch(() => props.modelValue, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
  if (!val) {
    // wait for leave transition to finish before clearing drag state
    setTimeout(resetDragState, 250)
  }
})

onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const maxWidthClass = computed(() => ({
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}[props.maxWidth]))
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-end md:items-center justify-center" @click.self="close">

      <!-- Backdrop: separate layer purely for dim + blur -->
      <Transition appear enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-250 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="modelValue" class="absolute inset-0 bg-black/40"
          style="backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);" @click="close" />
      </Transition>

      <!-- Panel -->
      <Transition appear enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-full md:translate-y-4 md:opacity-0 md:scale-95"
        enter-to-class="opacity-100 translate-y-0 md:opacity-100 md:scale-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0 md:opacity-100 md:scale-100"
        leave-to-class="opacity-100 translate-y-full md:opacity-0 md:translate-y-4 md:scale-95">
        <div v-if="modelValue" :style="dragStyle" :class="[
          'relative z-10 bg-white w-full flex flex-col select-none',
          'rounded-t-3xl md:rounded-3xl',
          'md:mx-4 md:shadow-2xl',
          maxWidthClass,
        ]" @touchstart="onTouchStart" @touchmove.prevent="onTouchMove" @touchend="onTouchEnd">
          <!-- Drag handle (mobile) -->
          <div class="flex justify-center pt-3 pb-1 md:hidden cursor-grab active:cursor-grabbing" aria-hidden="true">
            <div class="w-10 h-1 rounded-full bg-muted/30" />
          </div>

          <!-- Header -->
          <div v-if="title || $slots.header"
            class="flex items-start justify-between gap-4 px-5 pt-4 pb-3 border-b border-muted/10">
            <slot name="header">
              <div class="space-y-0.5">
                <h2 class="text-base font-semibold text-black/90">{{ title }}</h2>
                <p v-if="description" class="text-sm text-muted">{{ description }}</p>
              </div>
            </slot>

            <button v-if="!persistent" @click="close"
              class="hidden md:flex size-7 items-center justify-center rounded-full text-muted hover:bg-muted/10 hover:text-black/70 transition-colors shrink-0 cursor-pointer"
              aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-5 py-4 overflow-y-auto max-h-[75dvh] md:max-h-[70vh]">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-5 pb-5 pt-3 border-t border-muted/10">
            <slot name="footer" />
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>