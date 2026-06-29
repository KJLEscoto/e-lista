<!-- pages/inventory/[uid]/edit.vue -->
<script setup lang="ts">
import { ArrowLeft, BoxIcon } from '@lucide/vue'

definePageMeta({ layout: 'auth' })

const { setLayout } = useAuthLayout()
setLayout(false, false)

const handleUpdate = () => {
  // TODO: wire to your actual update logic (Firestore write, store action, etc.)
  console.log('Update debtor', debtor.value)
}

const debtor = ref(
  {
    uid: 'asdfnjdsks',
    name: 'John Doe',
    phone_no: '09123456789',
    to_be_collected: 700.00,
    collected_amount: 500.00,
  }
)
</script>

<template>
  <div class="w-full pb-10">
    <!-- Top actions bar -->
    <div class="sticky top-0 z-10 p-4 w-full bg-foreground">
      <NuxtLink :to="`/debtors/${debtor.uid}`"
        class="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow active:scale-95 transition-all duration-150">
        <ArrowLeft class="size-4 pointer-events-none" />
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="space-y-5 p-4">
      <UIInput v-model="debtor.uid" label="User ID" type="text" disabled />
      
      <UIInput v-model="debtor.name" label="Full Name" type="text" placeholder="Enter full name" required />

      <UIInput v-model="debtor.phone_no" label="Stock" type="number" placeholder="Enter phone no." required />

      <UIInput v-model="debtor.to_be_collected" label="To Be Collected (optional)" type="number" placeholder="Enter an amount" required />

      <UIInput v-model="debtor.collected_amount" label="Already Collected" type="number" placeholder="Enter an amount"
        required />

    </div>

    <div class="fixed inset-x-0 bottom-0 z-10 bg-foreground">
      <div class="max-w-md mx-auto p-4">
        <UIButton class="w-full" type="button" @click="handleUpdate">
          Update
        </UIButton>
      </div>
    </div>
  </div>
</template>