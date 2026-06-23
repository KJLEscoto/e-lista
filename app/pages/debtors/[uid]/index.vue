<!-- pages/inventory/[uid].vue -->
<script setup lang="ts">
import { ArrowLeft, Pencil, Archive, Trash2, BoxIcon, ChevronDown } from '@lucide/vue'

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
    remaining_balance: 200.00,
    target_amount: 700.00
  }
)

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
    <div class="flex p-4 items-center gap-4 w-full">
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

  </div>
</template>