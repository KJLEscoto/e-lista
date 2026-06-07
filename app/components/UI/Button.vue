<script setup lang="ts">
import { computed } from 'vue'
import { NuxtLink } from '#components'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'
type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    to?: string | object
    onClick?: (event: MouseEvent) => void
    loading?: boolean
    type?: ButtonType
    disabled?: boolean
    block?: boolean
    class?: string
  }>(),
  {
    variant: 'primary',
    loading: false,
    type: 'button',
    disabled: false,
    block: false,
  }
)

const isDisabled = computed(() => props.disabled || props.loading)

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-medium rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary select-none cursor-pointer px-6 py-2.5 text-base'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:brightness-110 active:brightness-95 focus-visible:ring-primary',
  secondary:
    'bg-primary/15 text-primary hover:bg-primary/25 active:bg-primary/30 focus-visible:ring-primary',
  outline:
    'border border-primary text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary',
  ghost:
    'text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500',
  link:
    'text-primary bg-transparent underline-offset-4 hover:underline active:opacity-70 focus-visible:ring-primary px-0! py-0!',
}

const disabledClasses = 'opacity-50 pointer-events-none cursor-not-allowed'
const blockClasses = 'w-full'

const classes = computed(() =>
  [
    baseClasses,
    variantClasses[props.variant],
    isDisabled.value ? disabledClasses : '',
    props.block ? blockClasses : '',
    props.class ?? '',
  ]
    .filter(Boolean)
    .join(' ')
)

const tag = computed(() => (props.to ? NuxtLink : 'button'))
</script>

<template>
  <component :is="tag" :to="to" :type="!to ? type : undefined" :disabled="!to ? isDisabled : undefined"
    :aria-disabled="isDisabled" :class="classes" v-bind="$attrs" @click="!isDisabled && onClick?.($event)">
    <!-- Loading spinner -->
    <svg v-if="loading" class="animate-spin h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24" aria-hidden="true">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>

    <!-- Default slot -->
    <slot />
  </component>
</template>