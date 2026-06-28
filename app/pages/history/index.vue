<script setup lang="ts">
import CollectionLog from '~/components/Auth/Debtors/CollectionLog.vue';
import PurchasedLog from '~/components/Auth/Inventory/PurchasedLog.vue';
import type { CollectionLogGroup } from '~/types/collection';
import type { PurchasedLogGroup } from '~/types/purchased';

definePageMeta({ layout: 'auth' })

const { setHeader } = usePageHeader()
setHeader('History', 'View your transactions')

const { setLayout } = useAuthLayout()
setLayout(true, true)

const collectionLogs: CollectionLogGroup[] = [
  {
    date: 'Apr 4, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', type: 'Partial Payment', amount: 32.50, time: '9:23 PM' },
      { id: '2', paymentMethod: 'GCASH', type: 'Full Payment', amount: 100.00, time: '12:23 PM' },
    ],
  },
  {
    date: 'Apr 3, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', type: 'Partial Payment', amount: 32.50, time: '9:23 PM' },
      { id: '2', paymentMethod: 'GCASH', type: 'Full Payment', amount: 100.00, time: '12:23 PM' },
    ],
  },
  {
    date: 'Apr 1, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', type: 'Partial Payment', amount: 32.50, time: '9:23 PM' },
      { id: '2', paymentMethod: 'GCASH', type: 'Full Payment', amount: 100.00, time: '12:23 PM' },
    ],
  },
  {
    date: 'Apr 1, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', type: 'Partial Payment', amount: 32.50, time: '9:23 PM' },
      { id: '2', paymentMethod: 'GCASH', type: 'Full Payment', amount: 100.00, time: '12:23 PM' },
    ],
  },
  {
    date: 'Apr 1, 2026',
    entries: [
      { id: '1', paymentMethod: 'CASH', type: 'Partial Payment', amount: 32.50, time: '9:23 PM' },
      { id: '2', paymentMethod: 'GCASH', type: 'Full Payment', amount: 100.00, time: '12:23 PM' },
    ],
  },
]

// sample data
const purchasedLogs: PurchasedLogGroup[] = [
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
</script>

<template>
  <main class="space-y-5">

    <CollectionLog :data="collectionLogs" />
    <PurchasedLog :data="purchasedLogs" />
    <p class="text-sm text-muted text-center">You're all caught up.</p>
  </main>
</template>