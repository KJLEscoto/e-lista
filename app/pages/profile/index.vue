<!-- pages/inventory/[uid].vue -->
<script setup lang="ts">
import { ChevronRight, Download, Home, LockKeyhole, LogOut, Tickets, TriangleAlert, Upload } from '@lucide/vue'
import { format } from 'date-fns'


definePageMeta({ layout: 'auth' })

const { user } = useAuth()
const { photoURL } = useUserPhoto()

const { setLayout } = useAuthLayout()
setLayout(false, false)

const router = useRouter()
const route = useRoute()

const uid = computed(() => route.params.uid as string)

// sample data
const product = ref({
  uid: uid.value,
  name: 'Premium Arabica Beans',
  category: 'Coffee Beans',
  sellingPrice: 45.00,
  srp: 32.50,
  stock: 1240,
  image: '/images/product_placeholder.png',
  createdAt: 'Jan 12, 2026',
  lastUpdate: 'Mar 28, 2026',
})

const lastLogin = computed(() => {
  const time = user.value?.metadata?.lastSignInTime
  if (!time) return null
  return format(new Date(time), 'MMMM d, yyyy • h:mm a')
})

const createdAt = computed(() => {
  const time = user.value?.metadata?.creationTime
  if (!time) return null
  return format(new Date(time), 'MMMM d, yyyy')
})

const showDeleteConfirm = ref(false)

const handleEdit = () => router.push(`/inventory/${uid.value}/edit`)
const handleArchive = () => { /* archive logic */ }
const handleDelete = () => { showDeleteConfirm.value = true }
</script>

<template>
  <div class="w-full">

    <!-- Top actions bar -->
    <div class="w-full flex items-center justify-between sticky top-0 bg-foreground z-20 p-4">
      <!-- Back -->
      <NuxtLink to="/home"
        class="w-auto h-auto p-3 gap-2 flex items-center justify-center rounded-full bg-primary text-white shadow active:scale-95 transition-all duration-150 cursor-pointer">
        <Home class="size-4 pointer-events-none" />
      </NuxtLink>

      <!-- Edit / Archive / Delete -->
      <div>
        <button @click="handleDelete"
          class="w-auto h-auto py-3 px-4 gap-2 flex items-center justify-center rounded-full bg-red-500 text-white active:scale-95 transition-all duration-150 cursor-pointer">
          <LogOut class="size-4 pointer-events-none" />
          <p class="text-sm">Sign Out</p>
        </button>
      </div>
    </div>


    <!-- Content -->
    <div class="space-y-8 p-4">

      <section class="flex items-center gap-4 p-4 bg-white rounded-2xl">
        <Image :src="photoURL" :alt="user?.displayName ?? 'User'" class="size-20 rounded-full shrink-0"
          referrerpolicy="no-referrer" />
        <div>
          <p class="text-sm text-muted tracking-wide truncate">ID: {{ user?.uid ?? '-' }}</p>
          <p class="text-lg text-black tracking-wide">{{ user?.displayName ?? 'User' }}</p>
          <p class="text-sm text-primary tracking-wide">{{ user?.email ?? '-' }}</p>
        </div>
      </section>

      <section class="space-y-3">
        <h1 class="text-sm text-muted">Account Activity</h1>
        <div class="space-y-0.5 rounded-2xl overflow-hidden">
          <div class="flex items-center justify-between bg-white p-4">
            <p class="text-sm">Last Login</p>
            <span class="text-sm font-medium text-black/70">{{ lastLogin ?? '—' }}</span>
          </div>
          <div class="flex items-center justify-between bg-white p-4">
            <p class="text-sm">Member Since</p>
            <span class="text-sm font-medium text-black/70">{{ createdAt ?? '—' }}</span>
          </div>
        </div>
      </section>

      <section class="space-y-3">
        <h1 class="text-sm text-muted">Security</h1>
        <UIButton class="flex items-center justify-between! bg-white p-4! w-full">
          <div class="flex items-center gap-2">
            <LockKeyhole class="size-4 text-black/70" />
            <p class="text-sm text-black/70">Change Password</p>
          </div>
          <p class="text-primary text-sm">RESET</p>
        </UIButton>
      </section>

      <section class="space-y-3">
        <h1 class="text-sm text-muted">Help</h1>
        <UIButton class="flex items-center justify-between! bg-white p-4! w-full">
          <div class="flex items-center gap-2">
            <Tickets class="size-4 text-black/70" />
            <p class="text-sm text-black/70">Submit a Ticket</p>
          </div>
          <ChevronRight class="size-4 text-black/70" />
        </UIButton>
      </section>

      <section class="space-y-3">
        <h1 class="text-sm text-muted">Backup</h1>
        <div class="space-y-0.5 rounded-2xl overflow-hidden">
          <UIButton class="flex justify-start items-center bg-white p-4! w-full">
            <Download class="size-4 text-black/70" />
            <p class="text-sm text-black/70">Export JSON Data</p>
          </UIButton>
          <UIButton class="flex justify-start items-center bg-white p-4! w-full">
            <Upload class="size-4 text-black/70" />
            <p class="text-sm text-black/70">Import JSON Data</p>
          </UIButton>
        </div>
      </section>

      <section class="space-y-3">
        <h1 class="text-sm text-muted">About</h1>
        <div class="space-y-2 bg-white p-4! w-full rounded-2xl">
          <div class="flex items-center gap-2">
            <h1 class="text-primary font-bold">E-Lista</h1>
            <p class="text-xs text-primary w-fit px-3 py-1 rounded-full bg-primary/10">BETA v1.0.0</p>
          </div>
          <p class="text-sm text-black/70">A simple inventory and debtor tracker designed to keep your records organized
            — monitor your products, track stock levels, manage customer balances, and stay updated on what comes in,
            goes out, and remains unpaid.
          </p>
        </div>
      </section>

      <section class="space-y-3">
        <h1 class="text-sm text-danger flex items-center gap-2">
          <TriangleAlert class="size-4 text-danger" />
          Danger Zone
        </h1>
        <div class="space-y-0.5 rounded-2xl overflow-hidden flex gap-2">
          <UIButton variant="outline" class="bg-white! p-4! w-full border border-danger!">
            <p class="text-sm text-danger">Erase All Data</p>
          </UIButton>
          <UIButton variant="danger" class="w-full p-4!">
            <p class="text-sm">Delete Account</p>
          </UIButton>
        </div>
      </section>
    </div>
  </div>
</template>