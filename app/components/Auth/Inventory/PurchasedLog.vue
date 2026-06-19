<!-- components/Product/PurchasedLog.vue -->
<script setup lang="ts">
import { Banknote, ChevronDown, ChevronRight, QrCode } from '@lucide/vue'

type PaymentMethod = 'CASH' | 'GCASH'

interface LogEntry {
  id: string
  paymentMethod: PaymentMethod
  debtorName: string
  pricePerUnit: number
  qty: number
  total: number
  time: string
  type: 'PURCHASE' | 'BORROW'
}

interface LogGroup {
  date: string
  entries: LogEntry[]
}

// sample data
const logs: LogGroup[] = [
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', debtorName: 'Café Marron', pricePerUnit: 32.50, qty: 20, total: 650.00, time: '9:23 PM', type: 'PURCHASE' },
      { id: '2', paymentMethod: 'GCASH', debtorName: 'Beanery Co.', pricePerUnit: 32.50, qty: 50, total: 1625.00, time: '8:45 PM', type: 'BORROW' },
    ]
  },
  {
    date: 'Apr 1, 2026',
    entries: [
      { id: '3', paymentMethod: 'CASH', debtorName: 'Roast Masters', pricePerUnit: 32.50, qty: 100, total: 3250.00, time: '11:15 AM', type: 'PURCHASE' },
    ]
  },
]

// track which groups are expanded (all open by default)
const expanded = ref<Record<string, boolean>>(
  Object.fromEntries(logs.map(g => [g.date, true]))
)

const toggle = (date: string) => {
  expanded.value[date] = !expanded.value[date]
}

const methodColors: Record<PaymentMethod, string> = {
  CASH: 'bg-green-100 text-green-600',
  GCASH: 'bg-blue-100 text-blue-600',
}
</script>

<template>
  <section>
    <h2 class="font-semibold text-black/80 sticky top-16 py-2 bg-foreground z-20">Purchased Log</h2>

    <!-- grouped by date -->
    <div class="space-y-3">
      <div v-for="group in logs" :key="group.date" class="space-y-1">

        <!-- date header / toggle -->
        <button @click="toggle(group.date)"
          class="w-full flex items-center justify-between py-2 cursor-pointer group sticky top-25 z-10 bg-foreground">
          <p class="text-xs font-semibold text-muted uppercase tracking-wider">{{ group.date }}</p>
          <ChevronDown class="size-4 text-muted transition-transform duration-200 pointer-events-none"
            :class="expanded[group.date] ? 'rotate-0' : '-rotate-90'" />
        </button>

        <!-- entries -->
        <Transition enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition-all duration-150 ease-in"
          leave-to-class="opacity-0 -translate-y-1">
          <div v-if="expanded[group.date]" class="space-y-2 pl-4 border-l-2 border-muted/15 ml-1">
            <div v-for="entry in group.entries" :key="entry.id"
              class="relative flex items-center gap-3 bg-white rounded-2xl px-4 py-3">
              <!-- timeline dot -->
              <div class="absolute -left-[1.3rem] size-2 rounded-full bg-primary ring-2 ring-zinc-100" />

              <!-- payment method badge -->
              <Tooltip :text="entry.paymentMethod === 'CASH' ? 'Cash' : 'GCash'" placement="top">
                <div class="text-xs font-bold p-3 rounded-lg shrink-0 tracking-wide"
                  :class="methodColors[entry.paymentMethod]">
                  <Banknote v-if="entry.paymentMethod === 'CASH'" class="size-5 pointer-events-none" />
                  <QrCode v-if="entry.paymentMethod === 'GCASH'" class="size-5 pointer-events-none" />
                </div>
              </Tooltip>

              <!-- info -->
              <div class="flex items-center justify-between w-full min-w-0 gap-2">
                <section class="min-w-0 space-y-2">
                  <p class="text-sm font-semibold text-black/80 truncate">{{ entry.debtorName }}</p>
                  <p class="text-xs text-muted">
                    ₱{{ entry.pricePerUnit.toFixed(2) }} × {{ entry.qty }} qty
                  </p>
                </section>

                <section class="shrink-0 text-right space-y-2">
                  <p class="text-sm font-bold text-primary text-nowrap">₱{{ entry.total.toLocaleString('en-PH', {
                    minimumFractionDigits: 2
                  }) }}</p>
                  <p class="text-xs text-muted">{{ entry.time }}</p>
                </section>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>