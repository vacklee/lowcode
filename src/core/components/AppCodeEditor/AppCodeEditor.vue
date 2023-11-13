<script lang="ts" setup>
import { computed } from 'vue'
import { Expression } from '@/core/data/code'
import JavaScriptEditor from './Editors/JavaScriptEditor.vue'
import RunFeedback from './RunFeedback.vue'

const props = defineProps<{
  modelValue?: Expression
  onChange?: (val?: Expression) => unknown
}>()

const emits = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue,
  set: val => {
    emits('update:modelValue', val)
    props.onChange?.(val)
  }
})
</script>

<template>
  <div :class="$style.layout">
    <div :class="$style.layout_main">
      <div :class="$style.layout_editor">
        <JavaScriptEditor v-model="innerValue" />
      </div>
      <div :class="$style.layout_feedback">
        <el-scrollbar>
          <RunFeedback :expression="innerValue" />
        </el-scrollbar>
      </div>
    </div>
    <div :class="$style.layout_aside"></div>
  </div>
</template>

<style lang="scss" module>
.layout {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;

  &_main {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
  }

  &_editor {
    flex: 1;
    height: 0;
  }

  &_feedback {
    height: 200px;
    border-top: 1px solid $border-color-base;
  }
}
</style>
