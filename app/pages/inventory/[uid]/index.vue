<!-- pages/inventory/[uid].vue -->
<script setup lang="ts">
import { ArrowLeft, Pencil, Archive, Trash2, BoxIcon, ChevronDown } from '@lucide/vue'
import PurchasedLog from '~/components/Auth/Inventory/PurchasedLog.vue'
import type { PurchasedLogGroup } from '~/types/purchased'

definePageMeta({ layout: 'auth' })

const { setLayout } = useAuthLayout()
setLayout(false, false)

const router = useRouter()
const route = useRoute()

const uid = computed(() => route.params.uid as string)

// sample data
const product = ref({
  uid: uid.value,
  name: 'Premium Arabica Beans',
  category: 'Coffee Beans',
  sellingPrice: 45.00,
  srp: 32.50,
  stock: 1240,
  image: '/images/product_placeholder.png',
  createdAt: 'Jan 12, 2026',
  lastUpdate: 'Mar 28, 2026',
})

// sample data
const logs: PurchasedLogGroup[] = [
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 1, 2026',
    entries: [
      { id: '3', paymentMethod: 'CASH', debtorName: 'Roast Masters', pricePerUnit: 32.50, qty: 100, total: 3250.00, time: '11:15 AM', type: 'PURCHASE' },
    ]
  },
]

const showDeleteConfirm = ref(false)

const handleEdit = () => router.push(`/inventory/${uid.value}/edit`)
const handleArchive = () => { /* archive logic */ }
const handleDelete = () => { showDeleteConfirm.value = true }
</script>

<template>
  <div class="w-full">

    <!-- Top actions bar -->
    <div class="w-full flex items-center justify-between sticky top-0 bg-foreground z-20 p-4">
      <!-- Back -->
      <NuxtLink to="/inventory"
        class="w-auto h-auto p-3 flex items-center justify-center rounded-full bg-primary text-white shadow active:scale-95 transition-all duration-150 cursor-pointer">
        <ArrowLeft class="size-4 pointer-events-none" />
      </NuxtLink>

      <!-- Edit / Archive / Delete -->
      <div class="flex items-center gap-2">
        <button @click="handleEdit"
          class="w-auto h-auto p-3 flex items-center justify-center rounded-full bg-white text-black shadow active:scale-95 transition-all duration-150 cursor-pointer">
          <Pencil class="size-4 pointer-events-none" />
        </button>
        <button @click="handleArchive"
          class="w-auto h-auto p-3 flex items-center justify-center rounded-full bg-white text-black shadow active:scale-95 transition-all duration-150 cursor-pointer">
          <Archive class="size-4 pointer-events-none" />
        </button>
        <button @click="handleDelete"
          class="w-auto h-auto p-3 flex items-center justify-center rounded-full bg-red-500 text-white active:scale-95 transition-all duration-150 cursor-pointer">
          <Trash2 class="size-4 pointer-events-none" />
        </button>
      </div>
    </div>


    <!-- Content -->
    <div class="space-y-5 p-4">

      <!-- Hero image -->
      <div class="relative w-full h-56 bg-zinc-200 overflow-hidden rounded-2xl">
        <Image :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
      </div>

      <!-- Name + price -->
      <section class="space-y-2">
        <p class=" bg-primary/10 text-primary text-sm px-3 py-1 rounded-full w-fit">
          {{ product.category }}
        </p>
        <h1 class="text-xl text-black/90">{{ product.name }}</h1>
        <p class="text-2xl font-bold text-primary">₱ {{ product.sellingPrice.toFixed(2) }}</p>
      </section>

      <section class="space-y-3">
        <!-- Stock + SRP -->
        <section class="grid grid-cols-2 gap-3">
          <div class="bg-white rounded-2xl p-4 space-y-2">
            <p class="text-xs text-muted uppercase tracking-wide font-medium">Stock</p>
            <p class="text-base font-bold text-black/90">{{ product.stock.toLocaleString() }} qty</p>
          </div>
          <div class="bg-white rounded-2xl p-4 space-y-2">
            <p class="text-xs text-muted uppercase tracking-wide font-medium">SRP</p>
            <div class="flex items-center gap-2">
              <span class="text-muted text-lg font-light">₱</span>
              <p class="text-base font-bold text-black/90">{{ product.srp.toFixed(2) }}</p>
            </div>
          </div>
        </section>

        <!-- Dates -->
        <section class="grid grid-cols-2 gap-3">
          <div class="bg-white rounded-2xl p-4 space-y-2">
            <p class="text-xs text-muted uppercase tracking-wide font-medium">Created At</p>
            <p class="text-base font-bold text-black/90">{{ product.createdAt }}</p>
          </div>
          <div class="bg-white rounded-2xl p-4 space-y-2">
            <p class="text-xs text-muted uppercase tracking-wide font-medium">Last Update</p>
            <p class="text-base font-bold text-black/90">{{ product.lastUpdate }}</p>
          </div>
        </section>
      </section>

      <PurchasedLog :data="logs" />


    </div>
  </div>
</template>