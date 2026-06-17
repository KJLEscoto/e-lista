<!-- pages/inventory/[uid].vue -->
<script setup lang="ts">
import { ArrowLeft, Pencil, Archive, Trash2, BoxIcon, ChevronDown } from '@lucide/vue'

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

const showDeleteConfirm = ref(false)

const handleEdit = () => router.push(`/inventory/${uid.value}/edit`)
const handleArchive = () => { /* archive logic */ }
const handleDelete = () => { showDeleteConfirm.value = true }
</script>

<template>
  <div class="w-full">

    <!-- Top actions bar -->
    <div class="w-full flex items-center justify-between sticky top-0 bg-foreground backdrop-blur-sm z-10 px-1 py-4">
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
    <div class="space-y-5">

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
            <div class="flex items-center gap-2">
              <BoxIcon class="size-5 text-muted shrink-0" />
              <p class="text-base font-bold text-black/90">{{ product.stock.toLocaleString() }} qty</p>
            </div>
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

      <AuthInventoryPurchasedLog />


    </div>
  </div>
</template>