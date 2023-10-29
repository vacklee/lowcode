<script lang="ts" setup>
import { computed, ref } from 'vue'
import { parsePixel, Unit } from '@/core/utils/unit'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    size?: 'small' | 'large' | 'default'
    // 允许空值
    allowEmpty?: boolean
    // 固定单位
    fixedUnit?: Unit
    placeholder?: string
    disabled?: boolean
  }>(),
  {
    size: 'small'
  }
)

const emits = defineEmits(['update:modelValue'])

const pixelValue = computed({
  get: () => (props.modelValue ? parsePixel(props.modelValue).value : ''),
  set: val => {
    if (!val && props.allowEmpty) {
      emits('update:modelValue', void 0)
    } else {
      emits('update:modelValue', `${val || 0}${pixelUnit.value}`)
    }
  }
})

const defaultUnit = ref(parsePixel(props.modelValue).unit || 'px')
const pixelUnit = computed({
  get: () => {
    if (props.fixedUnit) {
      return props.fixedUnit
    }
    return parsePixel(props.modelValue, defaultUnit.value).unit
  },
  set: val => {
    if (props.fixedUnit) {
      return
    }
    defaultUnit.value = val
    if (!pixelValue.value && props.allowEmpty) {
      return
    }
    emits('update:modelValue', `${pixelValue.value}${val}`)
  }
})
</script>

<template>
  <el-input
    :class="$style.input"
    type="number"
    :size="size"
    v-model="pixelValue"
    :min="0"
    :placeholder="placeholder"
    :disabled="disabled"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>

    <template #append v-if="!fixedUnit">
      <el-select
        style="width: 60px"
        v-model="pixelUnit"
        :size="size"
        placement="bottom-end"
      >
        <el-option label="px" value="px" />
        <el-option label="%" value="%" />
        <el-option label="rpx" value="rpx" />
        <el-option label="rem" value="rem" />
      </el-select>
    </template>
  </el-input>
</template>

<style lang="scss" module>
.input {
  & :global(.el-input__inner) {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none !important;
      display: none;
    }
  }

  & :global(.el-select__icon) {
    font-size: 12px !important;
  }
}
</style>
