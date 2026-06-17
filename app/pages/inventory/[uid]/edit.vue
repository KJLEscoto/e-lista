<!-- pages/inventory/[uid].vue -->
<script setup lang="ts">
import { ArrowLeft, BoxIcon } from '@lucide/vue'

definePageMeta({ layout: 'auth' })

const { setLayout } = useAuthLayout()
setLayout(false, false)

const route = useRoute()

const uid = computed(() => route.params.uid as string)

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
  <div class="w-full">
    <!-- Top actions bar -->
    <div class="sticky top-0 z-10 w-full bg-foreground/90 backdrop-blur-sm px-1 py-4">
      <NuxtLink :to="`/inventory/${product.uid}`"
        class="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow active:scale-95 transition-all duration-150">
        <ArrowLeft class="size-4 pointer-events-none" />
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="space-y-5">
      <!-- Hero image -->
      <label
        class="group relative block h-56 w-full cursor-pointer overflow-hidden rounded-2xl border border-dashed border-primary">
        <Image :src="product.image" :alt="product.name"
          class="h-full w-full object-cover" />

        <div
          class="absolute inset-0 flex items-center justify-center bg-black/10">
          <span class="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-900 shadow">
            Tap to change image
          </span>
        </div>

        <input type="file" accept="image/*" class="sr-only" @change="handleImageChange" />
      </label>

      <!-- Name + price -->
      <section class="space-y-2">
        <p class="w-fit rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
          {{ product.category }}
        </p>

        <h1 class="text-xl text-black/90">
          {{ product.name }}
        </h1>

        <p class="text-2xl font-bold text-primary">
          ₱ {{ product.sellingPrice.toFixed(2) }}
        </p>
      </section>

      <section class="space-y-3">
        <!-- Stock + SRP -->
        <section class="grid grid-cols-2 gap-3">
          <div class="space-y-2 rounded-2xl bg-white p-4">
            <p class="text-xs font-medium uppercase tracking-wide text-muted">
              Stock
            </p>

            <div class="flex items-center gap-2">
              <BoxIcon class="size-5 shrink-0 text-muted" />
              <p class="text-base font-bold text-black/90">
                {{ product.stock.toLocaleString() }} qty
              </p>
            </div>
          </div>

          <div class="space-y-2 rounded-2xl bg-white p-4">
            <p class="text-xs font-medium uppercase tracking-wide text-muted">
              SRP
            </p>

            <div class="flex items-center gap-2">
              <span class="text-lg font-light text-muted">₱</span>
              <p class="text-base font-bold text-black/90">
                {{ product.srp.toFixed(2) }}
              </p>
            </div>
          </div>
        </section>

        <!-- Dates -->
        <section class="grid grid-cols-2 gap-3">
          <div class="space-y-2 rounded-2xl bg-white p-4">
            <p class="text-xs font-medium uppercase tracking-wide text-muted">
              Created At
            </p>

            <p class="text-base font-bold text-black/90">
              {{ product.createdAt }}
            </p>
          </div>

          <div class="space-y-2 rounded-2xl bg-white p-4">
            <p class="text-xs font-medium uppercase tracking-wide text-muted">
              Last Update
            </p>

            <p class="text-base font-bold text-black/90">
              {{ product.lastUpdate }}
            </p>
          </div>
        </section>
      </section>

      <AuthInventoryPurchasedLog />
    </div>
  </div>
</template>