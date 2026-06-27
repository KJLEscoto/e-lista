<script setup lang="ts">
import { Search } from '@lucide/vue';
import CollectionLog from '~/components/Auth/Debtors/CollectionLog.vue';
import PurchasedLog from '~/components/Auth/Inventory/PurchasedLog.vue';

definePageMeta({ layout: 'auth' })

const { setHeader } = usePageHeader()
setHeader('History', 'View your transactions')

const { setLayout } = useAuthLayout()
setLayout(true, true)
</script>

<template>
  <main class="space-y-5">

    <CollectionLog />
    <PurchasedLog />
    <p class="text-sm text-muted text-center">You're all caught up.</p>
  </main>
</template>