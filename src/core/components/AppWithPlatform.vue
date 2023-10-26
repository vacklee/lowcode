<script lang="ts" setup>
import { computed } from 'vue'
import { useAppData, useCanvasData } from 'core/hooks/use-app-data'
import AppNodeRender from './AppNodeRender/AppNodeRender.vue'
import { AppPlatform } from '../config/enum'

const { canvasAttrs } = useCanvasData()
const { getAppState } = useAppData()

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

const outerStyle = computed(() => {
  let minWidth = '100%'
  let minHeight = '100%'

  if (canvasAttrs.value) {
    minWidth = `${canvasAttrs.value.width * canvasAttrs.value.scale}px`
    minHeight = `${canvasAttrs.value.height * canvasAttrs.value.scale}px`
  }

  return {
    minWidth,
    minHeight,
    maxWidth: minWidth,
    maxHeight: minHeight
  }
})

const platformClasses = computed(() => {
  const isH5 = getAppState('platform') === AppPlatform.H5
  const isMini = getAppState('platform') === AppPlatform.MINI
  const isPc = getAppState('platform') === AppPlatform.PC
  return {
    'platform-is-mobile': isH5 || isMini,
    'platform-is-pc': isPc,
    'platform-is-mini': isMini
  }
})
</script>

<template>
  <div :class="$style.platform_outer" :style="outerStyle" @click.stop>
    <div :class="$style.platform" :style="wrapStyle">
      <div
        :class="[$style.platform_inner, platformClasses]"
        :style="innerStyle"
      >
        <AppNodeRender />
      </div>
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
    transform-origin: center 0;
  }

  &_outer {
    position: static;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>
