<script setup lang="ts">
import { Search } from '@lucide/vue';

definePageMeta({ layout: 'auth' })

const { setHeader } = usePageHeader()
setHeader('Debtors', 'Manage your debtors')

const { setLayout } = useAuthLayout()
setLayout(true, true)

const toCollect = ref(2345.30);
const debtors = ref([
  { uid: 'asdfnjdsks', name: 'John Doe', remaining_balance: 500.00, amount_paid: 200.00 },
  { uid: 'qwerpoiu', name: 'Jane Smith', remaining_balance: 0.00, amount_paid: 300.00 },
  { uid: 'zxcvbnml', name: 'Michael Johnson', remaining_balance: 150.00, amount_paid: 20.00 },
]);
const openDebtors = computed(() => debtors.value.filter(debtor => debtor.remaining_balance > 0).length);
const closedDebtors = computed(() => debtors.value.filter(debtor => debtor.remaining_balance === 0).length);

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}
</script>

<template>
  <main class="space-y-5">
    <!-- search -->
    <section class="relative w-full">
      <Search class="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
      <input type="text" placeholder="Search a debtor name.."
        class="w-full rounded-2xl bg-white px-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted/70" />
    </section>

    <section class="grid grid-cols-3 gap-3">
      <div class="bg-white rounded-2xl p-4 space-y-2">
        <p class="text-sm text-muted tracking-wide font-medium">To Collect</p>
        <p class="text-base font-bold text-black/90"><span class="text-muted">₱</span> {{ toCollect.toFixed(2) }}</p>
      </div>
      <div class="bg-white rounded-2xl p-4 space-y-2">
        <p class="text-sm text-muted tracking-wide font-medium">Open</p>
        <p class="text-base font-bold text-black/90">{{ openDebtors }}</p>
      </div>
      <div class="bg-white rounded-2xl p-4 space-y-2">
        <p class="text-sm text-muted tracking-wide font-medium">Closed</p>
        <p class="text-base font-bold text-black/90">{{ closedDebtors }}</p>
      </div>
    </section>

    <section class="grid grid-cols-2 gap-3">
      <div v-for="debtor in debtors" :key="debtor.uid" class="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-4">
        <div
          class="text-base font-bold bg-primary/10 text-primary size-16 flex items-center justify-center rounded-full shrink-0">
          {{ getInitials(debtor.name) }}</div>
        <p class="text-sm text-black/90 font-semibold">{{ debtor.name }}</p>
      </div>
    </section>
  </main>
</template>