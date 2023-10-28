<script lang="ts" setup>
import { computed } from 'vue'
import { FourDirect } from '@/core/config/styles'
import AppFourDirectBox from '../../AppFourDirectBox.vue'

const props = defineProps<{
  margin?: FourDirect
  padding?: FourDirect
}>()

const emits = defineEmits(['update:margin', 'update:padding'])

const innerMargin = computed({
  get: () => props.margin,
  set: val => emits('update:margin', val)
})

const innerPadding = computed({
  get: () => props.padding,
  set: val => emits('update:padding', val)
})
</script>

<template>
  <AppFourDirectBox
    left-title="外边距"
    right-title="margin"
    v-model="innerMargin"
  >
    <AppFourDirectBox
      left-title="内边距"
      right-title="padding"
      v-model="innerPadding"
      style="background: #e3e6eb"
    />
  </AppFourDirectBox>
</template>
