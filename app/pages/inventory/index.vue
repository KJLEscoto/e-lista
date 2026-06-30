<!-- pages/inventory.vue -->
<script setup lang="ts">
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from '@lucide/vue';

definePageMeta({ layout: 'auth' })

const { setHeader } = usePageHeader()
setHeader('Inventory', 'Manage your products')

const { setLayout } = useAuthLayout()
setLayout(true, true)

// stock sort: null = default, 'asc' = low to high, 'desc' = high to low
type StockSort = null | 'asc' | 'desc'
const stockSort = ref<StockSort>(null)

function cycleStockSort() {
  if (stockSort.value === null) stockSort.value = 'asc'
  else if (stockSort.value === 'asc') stockSort.value = 'desc'
  else stockSort.value = null
}

const stockSortLabel = computed(() => {
  if (stockSort.value === 'asc') return 'Low'
  if (stockSort.value === 'desc') return 'High'
  return 'Stocks'
})

// sample data
const sampleCategories = ['All Items', 'Beverages', 'Snacks', 'Dairy', 'Produce', 'Meat']
const activeCategory = ref('All Items')
const products = [
  { id: 1, uid: 'sdafasdfasdgfds', name: 'Coca-Cola', category: 'Beverages', price: 1.99, stock: 100, image: '/images/product_placeholder.png' },
  { id: 2, uid: 'asdgfgsdfg', name: 'Lays Chips', category: 'Snacks', price: 2.49, stock: 9, image: '/images/product_placeholder.png' },
  { id: 3, uid: 'dfgdfgdfg', name: 'Milk', category: 'Dairy', price: 0.99, stock: 200, image: '/images/product_placeholder.png' },
]

const filteredProducts = computed(() => {
  let list = activeCategory.value === 'All Items'
    ? [...products]
    : products.filter(p => p.category === activeCategory.value)

  if (stockSort.value === 'asc') list.sort((a, b) => a.stock - b.stock)
  else if (stockSort.value === 'desc') list.sort((a, b) => b.stock - a.stock)

  return list
})

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

function onTouchStart(e: TouchEvent) {
  if (!e.touches[0] || !scrollRef.value) return
  startX.value = e.touches[0].pageX - scrollRef.value.offsetLeft
  scrollLeft.value = scrollRef.value.scrollLeft
}

function onTouchMove(e: TouchEvent) {
  if (!e.touches[0] || !scrollRef.value) return
  const x = e.touches[0].pageX - scrollRef.value.offsetLeft
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

    <!-- categories + stock sort -->
    <section class="flex items-center gap-1 w-full divide-x-2 divide-muted/10">

      <!-- stock sort toggle -->
      <div class="pr-3 shrink-0">
        <button @click="cycleStockSort"
          class="text-sm flex items-center gap-1 shrink-0 px-3 py-2 rounded-full font-medium transition-all duration-150 active:scale-95"
          :class="stockSort !== null ? 'text-primary bg-primary/10' : 'text-muted bg-white'">
          <p class="text-nowrap">{{ stockSortLabel }}</p>
          <!-- icon cycles: null→ArrowUpDown, asc→ArrowUp, desc→ArrowDown -->
          <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 scale-75"
            leave-active-class="transition duration-100 ease-in" leave-to-class="opacity-0 scale-75" mode="out-in">
            <ArrowUp v-if="stockSort === 'desc'" class="size-4 text-success" />
            <ArrowDown v-else-if="stockSort === 'asc'" class="size-4 text-danger" />
            <ArrowUpDown v-else class="size-4" />
          </Transition>
        </button>
      </div>

      <!-- categories scroll -->
      <div ref="scrollRef"
        class="flex items-center gap-2 w-full overflow-x-auto pl-2 scrollbar-none cursor-grab active:cursor-grabbing"
        :class="isDragging ? 'select-none' : ''" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="stopDrag"
        @mouseleave="stopDrag" @touchstart="onTouchStart" @touchmove="onTouchMove">
        <button v-for="category in sampleCategories" :key="category"
          class="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 active:scale-95"
          :class="activeCategory === category
            ? 'bg-primary text-white shadow-sm'
            : 'bg-white text-muted hover:bg-primary/10 hover:text-primary'" @click="activeCategory = category">
          {{ category }}
        </button>
      </div>
    </section>

    <!-- products -->
    <UserProductList :products="filteredProducts" />
  </main>
</template>