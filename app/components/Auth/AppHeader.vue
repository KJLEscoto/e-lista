<script setup lang="ts">
const { user } = useAuth()
const { formatted } = useDate()
const { photoURL } = useUserPhoto()

const firstName = computed(() => user.value?.displayName?.split(' ')[0] ?? 'there')
</script>

<template>
  <header class="md:py-5 py-3">
    <section class="flex md:items-center justify-between gap-5">
      <div class="flex items-center gap-3 w-full text-nowrap">
        <Image :src="photoURL" :alt="user?.displayName ?? 'User'" class="size-16 rounded-full shrink-0"
          referrerpolicy="no-referrer" />
        <ClientOnly>
          <PageHeader :title="`Hi, ${firstName}`" :description="formatted" />
          <template #fallback>
            <PageHeader title="Hi, there!" :description="formatted" />
          </template>
        </ClientOnly>
      </div>
    </section>
  </header>
</template>