<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: number
}>()

const emits = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue || 0,
  set: val => emits('update:modelValue', val)
})
</script>

<template>
  <div :class="$style.flex">
    <div :class="$style.flex_slider">
      <el-slider :min="0" :max="12" size="small" v-model="innerValue" />
    </div>
    <el-input-number
      :class="$style.flex_input"
      :min="0"
      :max="12"
      :step-strictly="true"
      :controls="false"
      size="small"
      v-model="innerValue"
    />
  </div>
</template>

<style lang="scss" module>
.flex {
  display: flex;
  align-items: center;
  gap: $spacing-mini;

  &_slider {
    flex: 1;
    width: 0;
    padding: 0 $spacing-small;
  }

  &_input {
    width: 64px;
  }
}
</style>
