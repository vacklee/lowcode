<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ResetComponentIds, resetComponents } from 'core/config/components'
import AppCIcon from '../AppCIcon.vue'

const props = defineProps<{
  id: ResetComponentIds
}>()

const componentNode = computed(() => resetComponents[props.id])
const dragging = ref(false)

const onMouseDown = () => {
  dragging.value = true
  const _ = () => {
    dragging.value = false
    document.removeEventListener('mouseup', _)
    document.removeEventListener('mouseover', _)
  }

  document.addEventListener('mouseup', _)
  document.addEventListener('mouseover', _)
}

const onDragStart = (payload: DragEvent) => {
  payload.dataTransfer!.effectAllowed = 'copy'
}
</script>

<template>
  <div
    :class="[$style.cell, dragging && $style.dragging]"
    draggable="true"
    @mousedown="onMouseDown"
    @dragstart="onDragStart"
  >
    <AppCIcon :class="$style.cell_icon" :name="componentNode.basicInfo.icon" />
    <span>{{ componentNode.basicInfo.title }}</span>
  </div>
</template>

<style lang="scss" module>
.cell {
  height: 36px;
  padding: 0 $spacing-mini;
  box-sizing: border-box;
  border: 1px solid $border-color-base;
  border-radius: $border-radius-base;
  display: flex;
  align-items: center;
  cursor: grab;
  transition: border-color 0.2s linear;
  user-select: none;

  &_icon {
    color: $text-color-gray;
    margin-right: $spacing-mini;
  }

  &:hover {
    border-color: $color-primary;
  }

  &.dragging {
    cursor: grabbing;
  }
}
</style>
