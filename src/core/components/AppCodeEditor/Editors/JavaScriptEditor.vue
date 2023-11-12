<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { editor } from '@/core/utils/monaco-editor'
import { Expression, defineExpression } from '@/core/data/code'

const props = defineProps<{
  modelValue?: Expression
}>()

const emits = defineEmits(['update:modelValue'])
const elRef = ref<HTMLElement | null>(null)
const innerValue = computed({
  get: () => props.modelValue?.content || '',
  set: val => {
    emits('update:modelValue', defineExpression(val))
  }
})

let editorInstance: editor.IStandaloneCodeEditor | null = null

onMounted(() => {
  if (!elRef.value) return
  editorInstance = editor.create(elRef.value, {
    value: innerValue.value,
    language: 'javascript',
    minimap: {
      enabled: false
    },
    contextmenu: false
  })

  editorInstance.onDidChangeModelContent(() => {
    innerValue.value = editorInstance!.getValue()
  })
})

onUnmounted(() => {
  editorInstance?.dispose()
})
</script>

<template>
  <div ref="elRef" :class="$style.editor"></div>
</template>

<style lang="scss" module>
.editor {
  width: 100%;
  height: 100%;
}
</style>
