<script setup lang="ts">
import { Home, Plus, UsersRound, ClipboardCopy, Package } from '@lucide/vue'

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/inventory', icon: Package, label: 'Inventory' },
  { to: '/debtors', icon: UsersRound, label: 'Debtors' },
  { to: '/history', icon: ClipboardCopy, label: 'History' },
]

const route = useRoute()
console.log(route.path)
const routeWithButton = [
  '/inventory',
  '/debtors',
]

const modalAddRef = ref()

const addHabit = () => {
  modalAddRef.value?.addHabit()
}

const isNavVisible = ref(true)
const lastScrollY = ref(0)

const handleScroll = () => {
  const currentScrollY = window.scrollY
  if (currentScrollY < 4) {
    isNavVisible.value = true
    lastScrollY.value = currentScrollY
    return
  }
  isNavVisible.value = currentScrollY < lastScrollY.value
  lastScrollY.value = currentScrollY
}

onMounted(() => {
  lastScrollY.value = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out select-none"
    :class="isNavVisible ? 'translate-y-0' : 'translate-y-[130%]'">
    <div class="w-full max-w-md mx-auto px-4 flex flex-col items-end"
      :style="{ paddingBottom: 'max(env(safe-area-inset-bottom), 14px)' }">
      <!-- FAB: part of the same transform container, aligned right -->

      <button v-if="routeWithButton.includes(route.path)" @click="addHabit"
        class="mb-3 mr-1 flex items-center justify-center size-16 rounded-3xl shadow-md shadow-black/30 bg-primary active:scale-95 transition-all duration-150 ease-in-out cursor-pointer">
        <Plus class="size-6 text-white pointer-events-none shrink-0" />
      </button>

      <!-- Nav bar -->
      <nav class="bg-white w-full rounded-3xl p-2 flex items-center justify-around shadow-lg">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
          class="flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all w-full duration-200 text-muted hover:text-primary active:scale-95 ease-in-out"
          active-class="text-primary bg-primary/10">
          <component :is="item.icon" class="size-4.5 pointer-events-none" />
          <p class="md:text-sm text-xs">{{ item.label }}</p>
        </NuxtLink>
      </nav>
    </div>
  </div>

  <ModalAdd v-if="route.path === '/debtors'" ref="modalAddRef" />
</template>