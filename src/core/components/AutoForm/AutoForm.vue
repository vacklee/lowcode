<script lang="ts" setup>
import { AutoFormColumn } from './types'
import { FormProps } from 'element-plus'
import AutoFormItem from './AutoFormItem.vue'

withDefaults(
  defineProps<{
    model?: Record<string, unknown> & {
      getValue: (key: string) => unknown
      setValue: (key: string, val: unknown) => unknown
    }
    columns?: AutoFormColumn[]
    elFormProps?: Partial<FormProps>
  }>(),
  {
    model: () => ({
      getValue: () => 0,
      setValue: () => 0
    }),
    columns: () => []
  }
)
</script>

<template>
  <el-form :class="$style.form" :model="model" v-bind="elFormProps">
    <AutoFormItem
      v-for="item in columns"
      :key="item.name"
      :column="item"
      :model="model"
    />
  </el-form>
</template>

<style lang="scss" module>
.form {
  & :global(.el-form-item) {
    margin-bottom: 0;
    &:not(:last-child) {
      margin-bottom: $spacing-mini;
    }
  }

  & :global(.el-form-item__label) {
    padding-right: 0;
  }

  &_label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
