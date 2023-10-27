<script lang="ts" setup>
import { IconSelectOption } from '@/core/config/select'
import { computed } from 'vue'
import AppIconBtn from '../../AppControls/AppIconBtn.vue'

const props = withDefaults(
  defineProps<{
    options?: IconSelectOption[]
    modelValue?: unknown
  }>(),
  {
    options: () => []
  }
)

const emits = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})
</script>

<template>
  <div :class="$style.box">
    <AppIconBtn
      v-for="item in options"
      :key="item.value"
      :icon="item.icon"
      :title="item.label"
      :active="innerValue === item.value"
      @click="innerValue = item.value"
    />
  </div>
</template>

<style lang="scss" module>
.box {
  display: inline-flex;
  align-items: center;
  gap: $spacing-mini;
}
</style>
