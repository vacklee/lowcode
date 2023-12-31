<script lang="ts" setup>
import { ref } from 'vue'
import AppCIcon from 'core/components/AppCIcon.vue'
import { usePageNode } from 'core/hooks/use-page-node'
import { AllComponentIds } from '@/core/config/components'

const props = defineProps<{
  id: string
  isEmpty?: boolean
}>()

const { insertNode } = usePageNode()

const isEnter = ref(false)

const onDragOver = (payload: DragEvent) => {
  payload.preventDefault()
  payload.stopPropagation()
}

const onDragEnter = (payload: DragEvent) => {
  payload.stopPropagation()
  // 为了让上一元素的 dragleave 事件先触发
  setTimeout(() => {
    isEnter.value = true
  }, 0)
}

const onDragLeave = (payload: DragEvent) => {
  payload.stopPropagation()
  isEnter.value = false
}

const onDrop = (payload: DragEvent) => {
  payload.stopPropagation()
  isEnter.value = false
  const componentId = payload.dataTransfer!.getData('component-id')
  if (componentId) {
    insertNode(props.id, componentId as AllComponentIds, true)
  }
}

const dragEventProxy = (el: HTMLElement) => {
  el.addEventListener('dragover', onDragOver)
  el.addEventListener('dragenter', onDragEnter)
  el.addEventListener('dragleave', onDragLeave)
  el.addEventListener('drop', onDrop)
  return () => {
    el.removeEventListener('dragover', onDragOver)
    el.removeEventListener('dragenter', onDragEnter)
    el.removeEventListener('dragleave', onDragLeave)
    el.removeEventListener('drop', onDrop)
  }
}

defineExpose({
  dragEventProxy
})
</script>

<template>
  <div
    :class="[$style.slot, isEnter && $style.enter, isEmpty && $style.empty]"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <div :class="$style.slot_icon">
      <AppCIcon name="content-slot" />
    </div>
  </div>
</template>

<style lang="scss" module>
.slot {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px dashed transparent;
  box-sizing: border-box;

  &.empty {
    flex: 1;
    height: auto;
    min-height: 100%;
    border-color: $border-color-base;
  }

  &_icon {
    height: 30px;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  &.empty > &_icon {
    display: flex;
  }

  &::after {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba($color-primary, 0.2);
    visibility: hidden;
  }

  &.enter {
    border-color: $color-primary;
    &::after {
      visibility: visible;
    }
  }
}
</style>
