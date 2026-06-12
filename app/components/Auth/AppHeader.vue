<script setup lang="ts">
const { user } = useAuth()
const { formatted } = useDate()
const { photoURL } = useUserPhoto()
const { title, description } = usePageHeader()

const firstName = computed(() => user.value?.displayName?.split(' ')[0] ?? 'there')

const resolvedTitle = computed(() => title.value || `Hi, ${firstName.value}`)
const resolvedDescription = computed(() => description.value || formatted)
</script>

<template>
  <header class="md:py-5 py-3">
    <section class="flex md:items-center justify-between gap-5">
      <div class="flex items-center justify-between gap-3 w-full text-nowrap">
        <ClientOnly>
          <PageHeader :title="resolvedTitle" :description="resolvedDescription" />
          <template #fallback>
            <PageHeader title="Hi, there!" :description="formatted" />
          </template>
        </ClientOnly>
        <Image :src="photoURL" :alt="user?.displayName ?? 'User'" class="size-16 rounded-full shrink-0"
          referrerpolicy="no-referrer" />
      </div>
    </section>
  </header>
</template>