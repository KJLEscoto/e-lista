<!-- pages/inventory/[uid].vue -->
<script setup lang="ts">
import { ArrowLeft, BoxIcon } from '@lucide/vue'

definePageMeta({ layout: 'auth' })

const { setLayout } = useAuthLayout()
setLayout(false, false)

const route = useRoute()

const uid = computed(() => route.params.uid as string)

const sampleCategories = ['Beverages', 'Snacks', 'Dairy', 'Produce', 'Meat']
const activeCategory = ref('')

const product = ref({
  uid: uid.value,
  name: 'Premium Arabica Beans',
  category: 'Coffee Beans',
  sellingPrice: 45.0,
  srp: 32.5,
  stock: 1240,
  image: '/images/product_placeholder.png',
  createdAt: 'Jan 12, 2026',
  lastUpdate: 'Mar 28, 2026',
})

const imagePreviewUrl = ref<string | null>(null)

const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  if (imagePreviewUrl.value) {
    URL.revokeObjectURL(imagePreviewUrl.value)
  }

  imagePreviewUrl.value = URL.createObjectURL(file)
  product.value.image = imagePreviewUrl.value
}
</script>

<template>
  <div class="w-full pb-10">
    <!-- Top actions bar -->
    <div class="sticky top-0 z-10 p-4 w-full bg-foreground">
      <NuxtLink :to="`/inventory/${product.uid}`"
        class="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow active:scale-95 transition-all duration-150">
        <ArrowLeft class="size-4 pointer-events-none" />
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="space-y-5 p-4">
      <!-- Hero image -->
      <label
        class="group relative block h-56 w-full cursor-pointer overflow-hidden rounded-2xl border border-dashed border-primary">
        <Image :src="product.image" :alt="product.name" class="h-full w-full object-cover" />

        <div class="absolute inset-0 flex items-center justify-center bg-black/10">
          <span class="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-900 shadow">
            Tap to change image
          </span>
        </div>

        <input type="file" accept="image/*" class="sr-only" @change="handleImageChange" />
      </label>


      <UIInput v-model="product.name" label="Product Name" type="text" placeholder="Enter product name" required />

      <section class="space-y-2">
        <p class="text-sm text-muted">Category
          <span class="text-sm leading-none text-primary">*</span>
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <button v-for="category in sampleCategories" :key="category"
            class="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 active:scale-95"
            :class="activeCategory === category
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-muted hover:bg-primary/10 hover:text-primary'" @click="activeCategory = category">
            {{ category }}
          </button>
        </div>
      </section>

      <UIInput v-model="product.stock" label="Stock" type="number" placeholder="Enter stock quantity" required />

      <UIInput v-model="product.srp" label="SRP" type="number" placeholder="Enter selling price" required />

      <UIInput v-model="product.sellingPrice" label="Selling Price" type="number" placeholder="Enter selling price"
        required />

    </div>

    <div class="fixed w-full bottom-0 p-4 bg-foreground">
      <UIButton class="w-full" type="button">
        Update
      </UIButton>
    </div>
  </div>
</template>