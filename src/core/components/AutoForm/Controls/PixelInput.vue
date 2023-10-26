<script lang="ts" setup>
import { computed } from 'vue'
import { parsePixel } from '@/core/utils/unit'

const props = defineProps<{
  modelValue?: string
}>()

const emits = defineEmits(['update:modelValue'])

const pixelValue = computed({
  get: () => parsePixel(props.modelValue).value,
  set: val => {
    emits('update:modelValue', `${val || 0}${pixelUnit.value}`)
  }
})

const pixelUnit = computed({
  get: () => parsePixel(props.modelValue).unit,
  set: val => {
    emits('update:modelValue', `${pixelValue.value}${val}`)
  }
})
</script>

<template>
  <el-input
    :class="$style.input"
    type="number"
    size="small"
    v-model="pixelValue"
    :min="0"
  >
    <template #append>
      <el-select
        style="width: 60px"
        v-model="pixelUnit"
        size="small"
        placement="bottom-end"
      >
        <el-option label="px" value="px" />
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
}
</style>
