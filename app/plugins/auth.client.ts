// plugins/auth.client.ts
export default defineNuxtPlugin({
  name: 'auth',
  dependsOn: ['firebase'],
  async setup() {
    const { handleRedirectResult } = useAuth()
    // const habitStore = useHabitStore()

    await handleRedirectResult()
  }
})