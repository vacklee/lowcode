<script lang="ts" setup>
import { ref, type Component, computed } from 'vue'
import { isExpression, getReturnValue } from '@/core/data/code'
import { AutoFormColumn, AutoFromControls, AutoFromControlsEnum } from './types'
import AppIconBtn from '../AppControls/AppIconBtn.vue'
import ExpressionInput from './Controls/ExpressionInput.vue'

const props = defineProps<{
  column: AutoFormColumn
  model: Record<string, unknown> & {
    getValue: (key: string) => unknown
    setValue: (key: string, val: unknown) => unknown
  }
}>()

/** 代码表达式 */
const isExpressionMode = ref(
  isExpression(props.model.getValue(props.column.name))
)

const control = computed(() => {
  if (isExpressionMode.value) {
    return {
      component: ExpressionInput,
      componentProps: {}
    }
  }

  const res = AutoFromControls[props.column.type as AutoFromControlsEnum](
    props.column.controlProps
  )

  return {
    component: res.component as Component,
    componentProps: res.componentProps
  }
})

const innerValue = computed({
  get: () => {
    const value = props.model.getValue(props.column.name)
    if (isExpression(value)) {
      return isExpressionMode.value ? value : getReturnValue(value)
    }
    return isExpressionMode.value ? void 0 : value
  },
  set: val => {
    props.model.setValue(props.column.name, val)
  }
})
</script>

<template>
  <el-form-item
    :key="column.name"
    :prop="column.name"
    :label="column.label"
    v-bind="column.elFormItemProps"
  >
    <template #label>
      <div :class="$style.form_label">
        <span>{{ column.label }}</span>

        <!-- 切换代码表达式 -->
        <AppIconBtn
          title="切换代码表达式"
          placement="top-end"
          icon="t-icon-fn-var"
          :size="24"
          v-model:active="isExpressionMode"
          v-if="column.allowExpression"
          :click-cancel="true"
        />
      </div>
    </template>

    <component
      :is="control.component"
      v-bind="control.componentProps"
      v-model="innerValue"
    />
  </el-form-item>
</template>

<style lang="scss" module>
.form {
  &_label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
