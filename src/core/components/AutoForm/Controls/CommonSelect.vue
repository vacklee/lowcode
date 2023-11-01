<script lang="ts" setup>
import { SelectOption } from '@/core/config/select'
import { computed, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    options?: SelectOption[]
    modelValue?: unknown
    labelFormat?: (item: SelectOption) => string | undefined
    placeholder?: string
    clearable?: boolean
    tooltip?: string
  }>(),
  {
    options: () => []
  }
)

const slots = useSlots()
const emits = defineEmits(['update:modelValue', 'popper-show', 'popper-hide'])
const innerValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})

const getLabel = (item: SelectOption) => {
  return props.labelFormat?.(item) || item.label
}

const onVisibleChange = (visible: boolean) => {
  if (visible) {
    emits('popper-show')
  } else {
    emits('popper-hide')
  }
}
</script>

<template>
  <el-tooltip :content="tooltip" :disabled="!tooltip" :show-after="1000">
    <el-select
      v-model="innerValue"
      style="width: 100%"
      :placeholder="placeholder"
      :clearable="clearable"
      @visible-change="onVisibleChange"
    >
      <template v-for="item in options" :key="item.value">
        <el-tooltip
          :content="item.tooltip"
          :disabled="!item.tooltip"
          :show-after="1000"
        >
          <el-option :value="item.value" :label="getLabel(item)" />
        </el-tooltip>
      </template>

      <template #prefix v-if="slots.prefix">
        <slot name="prefix" />
      </template>
    </el-select>
  </el-tooltip>
</template>
