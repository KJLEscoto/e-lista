<script setup lang="ts">
import { Search } from '@lucide/vue';

definePageMeta({ layout: 'auth' })

const { setHeader } = usePageHeader()
setHeader('Debtors', 'Manage your debtors')

const { setLayout } = useAuthLayout()
setLayout(true, true)

const debtors = ref([
  { uid: 'asdfnjdsks', name: 'John Doe', remaining_balance: 200.00, target_amount: 700.00 },
  { uid: 'qwerpoiu', name: 'Jane Smith', remaining_balance: 0.00, target_amount: 300.00 },
  { uid: 'zxcvbnml', name: 'Michael Johnson', remaining_balance: 150.00, target_amount: 170.00 },
]);
const toCollect = ref(
  debtors.value.reduce((total, debtor) => total + debtor.remaining_balance, 0)
);
const openDebtors = computed(() => debtors.value.filter(debtor => debtor.remaining_balance > 0).length);
const closedDebtors = computed(() => debtors.value.filter(debtor => debtor.remaining_balance === 0).length);

function getBalanceOpacity(debtor: { remaining_balance: number; target_amount: number }) {
  if (debtor.remaining_balance === 0) return 1
  const ratio = debtor.remaining_balance / debtor.target_amount
  return 0.05 + ratio * 0.9 // scales between 5% and 95%
}

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
      <NuxtLink :to="`/debtors/${debtor.uid}`" v-for="debtor in debtors" :key="debtor.uid"
        class="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-3">
        <div
          class="text-base font-bold bg-primary/10 text-primary size-16 flex items-center justify-center rounded-full shrink-0">
          {{ getInitials(debtor.name) }}</div>
        <p class="text-sm text-black/90 font-semibold">{{ debtor.name }}</p>
        <div class="text-center">
          <p class="text-lg text-primary font-bold">₱ {{ debtor.remaining_balance.toFixed(2) }}</p>
          <p class="text-xs text-muted font-medium">Remaining Balance</p>
        </div>
        <!-- progress bar -->
        <div class="w-full h-2 bg-muted/10 rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full transition-opacity duration-300" :style="{
            width: (debtor.remaining_balance / debtor.target_amount * 100) + '%',
            opacity: getBalanceOpacity(debtor)
          }">
          </div>
        </div>
      </NuxtLink>
    </section>
  </main>
</template>