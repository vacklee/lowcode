<script lang="ts" setup>
import { computed } from 'vue'
import { useCanvasData } from 'core/hooks/use-app-data'

const { canvasAttrs } = useCanvasData()
const wrapStyle = computed(() =>
  canvasAttrs.value
    ? {
        width: `${canvasAttrs.value.width}px`,
        minWidth: `${canvasAttrs.value.width}px`,
        maxWidth: `${canvasAttrs.value.width}px`,
        height: `${canvasAttrs.value.height}px`,
        minHeight: `${canvasAttrs.value.height}px`,
        maxHeight: `${canvasAttrs.value.height}px`
      }
    : {}
)

const innerStyle = computed(() => ({
  transform: `scale(${canvasAttrs.value?.scale || 1})`
}))
</script>

<template>
  <div :class="$style.platform_outer">
    <div :class="$style.platform" :style="wrapStyle">
      <div :class="$style.platform_inner" :style="innerStyle"></div>
    </div>
  </div>
</template>

<style lang="scss" module>
.platform {
  width: 100%;
  height: 100%;
  min-width: 1025px;
  min-height: 607px;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;

  &_inner {
    width: 100%;
    height: 100%;
    background-color: #fff;
    transform-origin: center 0;
  }

  &_outer {
    min-width: 100%;
    min-height: 100%;
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
