<script lang="ts" setup>
import { SelectOption } from '@/core/config/select'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    options?: SelectOption[]
    modelValue?: unknown
    labelFormat?: (item: SelectOption) => string | undefined
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

const getLabel = (item: SelectOption) => {
  return props.labelFormat?.(item) || item.label
}
</script>

<template>
  <el-select v-model="innerValue" style="width: 100%">
    <el-option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      :label="getLabel(item)"
    />
  </el-select>
</template>
