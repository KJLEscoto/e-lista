<script setup lang="ts">
import type { Product } from '~/types/product';

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="space-y-3">
    <UserProductCard v-for="product in products" :key="product.uid" :product="product" />
  </div>
</template>