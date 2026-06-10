<!-- layouts/auth.vue -->
<script setup lang="ts"> 
</script>

<template>
  <div class="w-full max-w-md mx-auto px-4 pt-4 pb-26 relative select-none">
    <ClientOnly>
      <AuthAppHeader />
      <slot />
      <AuthBottomNav />
    </ClientOnly>
  </div>
</template>