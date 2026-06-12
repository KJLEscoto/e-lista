<!-- pages/inventory.vue -->
<script setup lang="ts">
import { ChevronRight, Search } from '@lucide/vue';

definePageMeta({ layout: 'auth' })

const { setHeader } = usePageHeader()
setHeader('Inventory', 'Manage your products')

const sampleCategories = ['All Items', 'Beverages', 'Snacks', 'Dairy', 'Produce', 'Meat']
const activeCategory = ref('All Items')

// Drag-to-scroll
const scrollRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

function onMouseDown(e: MouseEvent) {
  isDragging.value = true
  startX.value = e.pageX - (scrollRef.value?.offsetLeft ?? 0)
  scrollLeft.value = scrollRef.value?.scrollLeft ?? 0
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value || !scrollRef.value) return
  e.preventDefault()
  const x = e.pageX - (scrollRef.value.offsetLeft ?? 0)
  const walk = x - startX.value
  scrollRef.value.scrollLeft = scrollLeft.value - walk
}

function stopDrag() {
  isDragging.value = false
}

// Touch support
function onTouchStart(e: TouchEvent) {
  startX.value = e.touches[0].pageX - (scrollRef.value?.offsetLeft ?? 0)
  scrollLeft.value = scrollRef.value?.scrollLeft ?? 0
}

function onTouchMove(e: TouchEvent) {
  if (!scrollRef.value) return
  const x = e.touches[0].pageX - (scrollRef.value.offsetLeft ?? 0)
  scrollRef.value.scrollLeft = scrollLeft.value - (x - startX.value)
}
</script>

<template>
  <main class="space-y-5">
    <!-- search -->
    <section class="relative w-full">
      <Search class="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      <input type="text" placeholder="Search a product name.."
        class="w-full rounded-2xl bg-white px-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted/70" />
    </section>

    <!-- categories -->
    <section>
      <div ref="scrollRef"
        class="flex items-center gap-2 w-full overflow-x-auto py-1 scrollbar-none cursor-grab active:cursor-grabbing"
        :class="isDragging ? 'select-none' : ''" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="stopDrag"
        @mouseleave="stopDrag" @touchstart="onTouchStart" @touchmove="onTouchMove">
        <button v-for="category in sampleCategories" :key="category"
          class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 active:scale-95"
          :class="activeCategory === category
            ? 'bg-primary text-white shadow-sm'
            : 'bg-white text-muted hover:bg-primary/10 hover:text-primary'" @click="activeCategory = category">
          {{ category }}
        </button>
      </div>
    </section>

    <!-- products -->
    <section class="space-y-3">
      <div class="p-4 rounded-2xl h-20 w-full bg-white"></div>
      <div class="p-4 rounded-2xl h-20 w-full bg-white"></div>
      <div class="p-4 rounded-2xl h-20 w-full bg-white"></div>
    </section>
  </main>
</template>