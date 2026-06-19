<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'

interface Product {
  uid: string
  image: string
  name: string
  category: string
  stock: number
  price: number
}

defineProps<{
  product: Product
}>()
</script>

<template>
  <NuxtLink :to="`/inventory/${product.uid}`"
    class="px-4 py-3 rounded-2xl w-full bg-white flex items-center gap-3 active:scale-[0.98] transition-all duration-150">
    <Image :src="product.image" :alt="product.name" class="size-12 rounded-lg object-cover shrink-0" />

    <div class="flex items-center justify-between gap-10 w-full min-w-0">
      <section class="space-y-1 min-w-0">
        <h3 class="text-sm text-black/80 font-semibold truncate">{{ product.name }}</h3>
        <div class="flex items-center gap-1.5">
          <p class="text-xs text-muted">{{ product.category }}</p>
          <div class="size-1 rounded-full bg-muted/30 shrink-0" />
          <p :class="['text-xs', product.stock < 10 ? 'text-danger' : 'text-success']">
            {{ product.stock }} stocks
          </p>
        </div>
      </section>

      <section class="flex items-center gap-1.5 shrink-0">
        <h1 class="text-sm font-semibold text-primary text-nowrap">₱ {{ product.price.toFixed(2) }}</h1>
        <ChevronRight class="size-4 text-muted/50" />
      </section>
    </div>
  </NuxtLink>
</template>