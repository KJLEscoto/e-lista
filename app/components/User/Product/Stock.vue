<script setup lang="ts">
import { TrendingDown } from '@lucide/vue'
import type { Product } from '~/types/product';

defineProps<{
  product: Product
}>()
</script>

<template>
  <NuxtLink :to="`/inventory/${product.uid}`"
    class="px-4 py-3 rounded-2xl w-full bg-white flex items-center gap-3 active:scale-[0.98] transition-all duration-150">
    <Image :src="product.image" :alt="product.name" class="size-12 rounded-lg object-cover shrink-0" />

    <div class="flex items-center justify-between gap-10 w-full min-w-0">
      <section class="space-y-1">
        <h3 class="text-sm text-black/80 font-semibold truncate">{{ product.name }}</h3>
        <p class="text-xs text-muted">{{ product.category }}</p>
      </section>

      <section class="flex items-center gap-1.5 shrink-0">
        <h1 class="text-sm text-danger font-bold text-nowrap">{{ product.stock }} <span class="font-normal">left</span></h1>
        <TrendingDown class="size-4 text-danger" />
      </section>
    </div>
  </NuxtLink>
</template>