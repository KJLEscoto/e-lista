<!-- pages/inventory/[uid].vue -->
<script setup lang="ts">
import { ArrowLeft, Pencil, Archive, Trash2, BoxIcon, ChevronDown, Eye, SquarePen } from '@lucide/vue'
import CollectionLog from '~/components/Auth/Debtors/CollectionLog.vue'

definePageMeta({ layout: 'auth' })

const { setLayout } = useAuthLayout()
setLayout(false, false)

const router = useRouter()
const route = useRoute()

const uid = computed(() => route.params.uid as string)

// sample data
const debtor = ref(
  {
    uid: 'asdfnjdsks',
    name: 'John Doe',
    phone_no: '09123456789',
    starting_amount: 100.00,
    remaining_balance: 200.00,
    collected_amount: 500.00,
    target_amount: 700.00,
  }
)

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

const showDeleteConfirm = ref(false)

const handleEdit = () => router.push(`/debtors/${uid.value}/edit`)
const handleArchive = () => { /* archive logic */ }
const handleDelete = () => { showDeleteConfirm.value = true }
</script>

<template>
  <div class="w-full">

    <!-- Top actions bar -->
    <div class="w-full flex items-center justify-between sticky top-0 bg-foreground z-20 p-4">
      <!-- Back -->
      <NuxtLink to="/debtors"
        class="w-auto h-auto p-3 flex items-center justify-center rounded-full bg-primary text-white shadow active:scale-95 transition-all duration-150 cursor-pointer">
        <ArrowLeft class="size-4 pointer-events-none" />
      </NuxtLink>

      <!-- Edit / Archive / Delete -->
      <div class="flex items-center gap-2">
        <button @click="handleEdit"
          class="w-auto h-auto p-3 flex items-center justify-center rounded-full bg-white text-black shadow active:scale-95 transition-all duration-150 cursor-pointer">
          <Pencil class="size-4 pointer-events-none" />
        </button>
        <button @click="handleArchive"
          class="w-auto h-auto p-3 flex items-center justify-center rounded-full bg-white text-black shadow active:scale-95 transition-all duration-150 cursor-pointer">
          <Archive class="size-4 pointer-events-none" />
        </button>
        <button @click="handleDelete"
          class="w-auto h-auto p-3 flex items-center justify-center rounded-full bg-red-500 text-white active:scale-95 transition-all duration-150 cursor-pointer">
          <Trash2 class="size-4 pointer-events-none" />
        </button>
      </div>
    </div>


    <!-- Content -->
    <div class="p-4 space-y-3 w-full">
      <div class="flex items-center gap-4 p-4 bg-white w-full rounded-2xl">
        <section
          class="text-xl font-bold bg-primary/10 text-primary p-4 size-20! flex items-center justify-center rounded-full shrink-0">
          {{ getInitials(debtor.name) }}
        </section>

        <!-- Name + price -->
        <section class="space-y-1">
          <p class=" text-muted text-sm">
            {{ debtor.uid }}
          </p>
          <h1 class="text-lg text-black font-bold">{{ debtor.name }}</h1>
          <p class="text-base text-muted">
            {{ debtor.phone_no }}
          </p>
        </section>
      </div>

      <div class="bg-white p-4 rounded-2xl space-y-4">
        <section class="flex items-start gap-4 justify-between">
          <div class="space-y-2">
            <p class="text-sm text-muted">Remaining Balance</p>
            <h2 class="text-lg font-bold text-black">
              <span class="text-muted font-normal">₱</span> {{ debtor.remaining_balance.toFixed(2) }}
            </h2>
          </div>
          <SquarePen class="size-4 text-muted pointer-events-none" />
        </section>

        <section class="w-full space-y-2">
          <div class="w-full h-2 bg-muted/10 rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full transition-all duration-300" :style="{
              width: (debtor.remaining_balance / debtor.target_amount * 100) + '%',
              opacity: getBalanceOpacity(debtor)
            }">
            </div>
          </div>

          <p class="text-sm font-bold w-full text-end"><span class="text-muted font-normal">Total: ₱</span> {{
            debtor.target_amount.toFixed(2) }}</p>
        </section>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white rounded-2xl p-4 space-y-2">
          <p class="text-sm text-muted font-medium">Collected</p>
          <p class="text-base font-bold text-black/90"><span class="text-muted font-normal">₱</span> {{
            debtor.collected_amount.toFixed(2) }}</p>
        </div>
        <div class="bg-white rounded-2xl p-4 space-y-2">
          <p class="text-sm text-muted font-medium">Starting Amount</p>
          <p class="text-base font-bold text-black/90"><span class="text-muted font-normal">₱</span> {{
            debtor.starting_amount.toFixed(2) }}</p>
        </div>
      </div>

      <UIButton class="w-full text-sm" type="button">
        Log Collection
      </UIButton>

    </div>

    <div class="p-4 space-y-3 w-full">
      <h1 class="text-black/80">Recent Activities</h1>

      <div class="grid grid-cols-2 gap-4">
        <section class="bg-white rounded-2xl p-4 space-y-4">
          <div class="flex items-center justify-between gap-4">
            <p class="text-sm text-muted font-medium">Purchased</p>
            <Eye class="size-4 text-muted pointer-events-none" />
          </div>

          <div class="space-y-1">
            <h1 class="text-black/80 font-bold">3 items</h1>
            <p class="text-xs text-muted font-medium">Total of <span class="text-muted font-normal">₱</span> 156.00</p>
          </div>

          <UIButton class="w-full text-sm rounded-xl" variant="secondary" type="button">
            Log Purchase
          </UIButton>
        </section>

        <section class="bg-white rounded-2xl p-4 space-y-4">
          <div class="flex items-center justify-between gap-4">
            <p class="text-sm text-muted font-medium">Borrowed</p>
            <Eye class="size-4 text-muted pointer-events-none" />
          </div>

          <div class="space-y-1">
            <h1 class="text-black/80 font-bold"><span class="text-muted font-normal">₱</span> 44.00</h1>
            <p class="text-xs text-muted font-medium">Apr 4, 2026</p>
          </div>

          <UIButton class="w-full text-sm rounded-xl" variant="secondary" type="button">
            Log Borrow
          </UIButton>

        </section>
      </div>
    </div>

    <div class="p-4 space-y-3 w-full">
      <CollectionLog />
    </div>

  </div>
</template>