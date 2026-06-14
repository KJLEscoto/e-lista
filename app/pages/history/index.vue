<script setup lang="ts">
import { Search } from '@lucide/vue';

definePageMeta({ layout: 'auth' })

const { setHeader } = usePageHeader()
setHeader('History', 'View your transactions')

const { setLayout } = useAuthLayout()
setLayout(true, true)
</script>

<template>
  <main class="space-y-5">
    <!-- search -->
    <section class="relative w-full">
      <Search class="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      <input type="text" placeholder="Search a transaction.."
        class="w-full rounded-2xl bg-white px-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted/70" />
    </section>
  </main>
</template>