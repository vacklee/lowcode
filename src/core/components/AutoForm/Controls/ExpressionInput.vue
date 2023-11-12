<script lang="ts" setup>
import { computed } from 'vue'
import { Expression } from '@/core/data/code'
import { useDialogX } from '@/core/hooks/use-dialog-x'

const props = defineProps<{
  modelValue?: Expression
}>()

const emits = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})

const { showCodeEditorDialog } = useDialogX()
const handleOpen = () => {
  showCodeEditorDialog({
    value: innerValue.value,
    onSubmit: val => {
      innerValue.value = val
    }
  })
}
</script>

<template>
  <el-button size="small" @click="handleOpen">click</el-button>
</template>
