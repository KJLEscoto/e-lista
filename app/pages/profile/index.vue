<!-- pages/inventory/[uid].vue -->
<script setup lang="ts">
import { Home, LogOut } from '@lucide/vue'
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

      <section class="flex items-center gap-4">
        <Image :src="photoURL" :alt="user?.displayName ?? 'User'" class="size-20 rounded-full shrink-0"
          referrerpolicy="no-referrer" />
        <div>
          <p class="text-sm text-muted tracking-wide truncate">ID: {{ user?.uid ?? '-' }}</p>
          <p class="text-lg text-black tracking-wide">{{ user?.displayName ?? 'User' }}</p>
          <p class="text-sm text-black tracking-wide">{{ user?.phone ?? '-' }}</p>
        </div>
      </section>

      <section class="space-y-2">
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
    </div>
  </div>
</template>