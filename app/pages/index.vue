<!-- pages/index.vue -->
<script setup lang="ts">
const { sampleHabits } = useSampleHabits()
const signOutSuccess = useState<boolean>('sign-out-success', () => false)
const deleteAccountSuccess = useState<boolean>('delete-account-success', () => false)

const mascotSrc = '/images/mascot/intro_model.png'
</script>

<template>
  <div class="flex flex-col md:gap-10 gap-6 items-center justify-center">
    <Alert type="success" title="Signed out!" message="You have been successfully signed out." :visible="signOutSuccess"
      :timeout="3000" @dismiss="signOutSuccess = false" />

    <!-- Reset success -->
    <Alert type="success" title="Account deleted!" message="Your account is not accessible anymore."
      :visible="deleteAccountSuccess" :timeout="3000" @dismiss="deleteAccountSuccess = false" />

    <section class="space-y-5 text-center">
      <UIButton to="/login">
        <p>Get Started</p>
      </UIButton>
    </section>
  </div>
</template>