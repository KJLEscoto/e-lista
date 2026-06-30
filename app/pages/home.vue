<!-- pages/home.vue -->
<script setup lang="ts">
import { ChevronRight } from '@lucide/vue';

definePageMeta({ layout: 'auth' })

const { setHeader } = usePageHeader()
setHeader('Home', '')

const { setLayout } = useAuthLayout()
setLayout(true, true)


const toCollect = ref(2345.30);
const activeDebtors = ref(5);

const products = [
  { id: 1, uid: 'sdafasdfasdgfds', name: 'Coca-Cola', category: 'Beverages', price: 1.99, stock: 100, image: '/images/product_placeholder.png' },
  { id: 2, uid: 'asdgfgsdfg', name: 'Lays Chips', category: 'Snacks', price: 2.49, stock: 9, image: '/images/product_placeholder.png' },
  { id: 3, uid: 'dfgdfgdfg', name: 'Milk', category: 'Dairy', price: 0.99, stock: 200, image: '/images/product_placeholder.png' },
]
</script>

<template>
  <main class="space-y-5">
    <section class="grid grid-cols-2 items-center gap-4 w-full">
      <!-- to collect -->
      <div class="p-4 rounded-2xl bg-white w-full h-full space-y-3">
        <p class="text-sm text-muted">To Collect</p>
        <div class="space-y-1">
          <h1 class="font-bold text-2xl">₱ {{ toCollect.toFixed(2) }}</h1>
          <p class="text-sm text-muted"><span class="text-primary font-semibold">{{ activeDebtors }}</span> Active
            Debtors</p>
        </div>
      </div>

      <!-- weekly purchase -->
      <div class="p-4 rounded-2xl bg-white w-full h-full">
        <p class="text-sm text-muted">Weekly Purchase</p>
        <p class="font-bold">M T W T F S S</p>
      </div>
    </section>

    <!-- log calendar -->
    <section class="space-y-3">
      <h1 class="text-black/80">Sales Calendar</h1>

      <!-- calendar -->
      <div class="p-4 rounded-2xl h-40 w-full bg-white">
      </div>
    </section>

    <!-- low on stock -->
    <section class="space-y-3">
      <div class="w-full justify-between flex items-center">
        <h1 class="text-black/80">Inventory Stock</h1>
        <NuxtLink to="/inventory"
          class="text-sm flex gap-1 items-center text-muted hover:text-primary transition-colors">
          All Inventory
          <ChevronRight class="size-4 pointer-events-none" />
        </NuxtLink>
      </div>

      <!-- low on stock list -->
      <UserProductList :products="products" />
    </section>

    <!-- today's log -->
    <section class="space-y-3">
      <div class="w-full justify-between flex items-center">
        <h1 class="text-black/80">Today's Log</h1>
        <NuxtLink to="/inventory"
          class="text-sm flex gap-1 items-center text-muted hover:text-primary transition-colors">
          History
          <ChevronRight class="size-4 pointer-events-none" />
        </NuxtLink>
      </div>

      <!-- today's log entries -->
      <div class="p-4 rounded-2xl h-40 w-full bg-white">
      </div>
    </section>
  </main>
</template>