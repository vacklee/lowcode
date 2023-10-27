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
const innerValue = computed({
  get: () => {
    let value = props.modelValue
    if (isPixel(props.modelValue)) {
      value = toPx(props.modelValue)
    }

    if (spacingOptions.some(item => item.value === value)) {
      return value
    }

    emits('update:modelValue', Constants.CSS_INHERIT)

    return Constants.CSS_INHERIT
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
    :options="spacingOptions"
    :label-format="labelFormat"
    v-model="innerValue"
  />
</template>
