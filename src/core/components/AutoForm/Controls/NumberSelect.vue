<script lang="ts" setup>
import _CollapseTransition from 'element-plus/es/components/collapse-transition/index.mjs'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: number
    min: number
    max: number
    step?: number
  }>(),
  {
    step: 1
  }
)

const emits = defineEmits(['update:modelValue'])

const options = computed(() => {
  const { min, max, step } = props
  const _options: { value: number; label: string }[] = []
  let current = min

  while (current <= max) {
    _options.push({
      value: current,
      label: `${current}`
    })
    current += step
  }

  if (!_options.some(item => item.value === max)) {
    _options.push({
      value: max,
      label: `${max}`
    })
  }

  return _options
})

const innerValue = computed({
  get: () => {
    const { modelValue } = props
    if (modelValue && options.value.some(item => item.value === modelValue)) {
      return modelValue
    }
    return void 0
  },
  set: val => {
    emits('update:modelValue', val)
  }
})
</script>

<template>
  <el-select v-model="innerValue" style="width: 100%">
    <el-option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    />
  </el-select>
</template>
