<template>
  <div :class="['w-full max-w-md mx-auto px-4 relative select-none', showHeader ? 'pt-4 pb-26' : 'pt-0 pb-10']">
    <ClientOnly>
      <AuthAppHeader v-if="showHeader" />
      <slot />
      <AuthBottomNav v-if="showNav" />
      <ModalAddProduct />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { showHeader, showNav } = useAuthLayout()
</script>