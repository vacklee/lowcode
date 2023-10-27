<script lang="ts" setup>
import { computed } from 'vue'
import CommonSelect from './CommonSelect.vue'
import { SelectOption, spacingOptions } from 'core/config/select'
import { Constants } from 'core/config/constant'
import { isPixel } from '@/core/utils/unit'
import { useCanvasData } from '@/core/hooks/use-app-data'

const props = defineProps<{
  modelValue?: unknown
  parentName?: string
}>()

const { toPx } = useCanvasData()

const emits = defineEmits(['update:modelValue'])

const hasParent = computed(() => !!props.parentName)
const computedOptions = computed(() => {
  return spacingOptions.filter(item => {
    if (!hasParent.value && item.value === Constants.CSS_INHERIT) {
      return false
    }
    return true
  })
})
const defaultValue = computed(() => computedOptions.value[0].value)

const innerValue = computed({
  get: () => {
    let value = props.modelValue
    if (isPixel(props.modelValue)) {
      value = toPx(props.modelValue)
    }

    if (spacingOptions.some(item => item.value === value)) {
      return value
    }

    emits('update:modelValue', defaultValue.value)

    return defaultValue.value
  },
  set: val => emits('update:modelValue', val)
})

const labelFormat = (item: SelectOption) => {
  if (item.value === Constants.CSS_INHERIT && props.parentName) {
    return `${item.label}(继承${props.parentName})`
  }
}
</script>

<template>
  <CommonSelect
    :options="computedOptions"
    :label-format="labelFormat"
    v-model="innerValue"
  />
</template>
