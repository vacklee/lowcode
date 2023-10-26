<script lang="ts" setup>
import { AutoFormColumn, AutoFromControls } from './types'
import { FormProps } from 'element-plus'

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

const getControl = (column: AutoFormColumn) => AutoFromControls[column.type]
</script>

<template>
  <el-form :class="$style.form" :model="model" v-bind="elFormProps">
    <el-form-item
      v-for="item in columns"
      :key="item.name"
      :prop="item.name"
      :label="item.label"
      v-bind="item.elFormItemProps"
    >
      <template #label>
        <span>{{ item.label }}</span>
      </template>

      <component
        :is="getControl(item).component"
        v-bind="getControl(item).componentProps"
        :model-value="model.getValue(item.name)"
        @update:modelValue="model.setValue(item.name, $event)"
      />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" module>
.form {
  & :global(.el-form-item):last-child {
    margin-bottom: 0;
  }
}
</style>
