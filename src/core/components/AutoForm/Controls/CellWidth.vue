<script lang="ts" setup>
import { computed } from 'vue'
import { CellWidth as TypeCellWidth } from 'core/utils/unit'
import { AutoFormColumn, autoFormColumn, AutoFromControlsEnum } from '../types'
import AutoForm from '../AutoForm.vue'

const props = defineProps<{
  modelValue?: {
    mobile: TypeCellWidth
    pc: TypeCellWidth
  }
}>()

const emits = defineEmits(['update:modelValue'])

const model = computed(() => {
  const target = {
    mobile: props.modelValue?.mobile ?? 'fill',
    pc: props.modelValue?.pc ?? 'fill'
  }

  return {
    ...target,
    getValue: (k: string) => target[k as keyof typeof target],
    setValue: (k: string, value: unknown) => {
      emits('update:modelValue', {
        ...target,
        [k]: value
      })
    }
  }
})

const columns: AutoFormColumn[] = [
  autoFormColumn(AutoFromControlsEnum.CellWidthItem, 'mobile', '移动端列宽'),
  autoFormColumn(AutoFromControlsEnum.CellWidthItem, 'pc', 'PC端列宽')
]
</script>

<template>
  <AutoForm :class="$style.form" :columns="columns" :model="model" />
</template>

<style lang="scss" module>
.form {
  width: 100%;
  & :global(.el-form-item__label) {
    color: $text-color-gray;
  }
}
</style>
