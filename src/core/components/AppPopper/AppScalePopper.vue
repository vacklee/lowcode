<script lang="ts" setup>
import { computed } from 'vue'
import AppCellGroup from '../AppCellGroup.vue'
import AppPoppover from '../AppPoppover.vue'
import { useCanvasData } from 'core/hooks/use-app-data'

const emits = defineEmits(['visible-change'])
const { canvasAttrs, setScale } = useCanvasData()

const zoomConfig = [0.5, 0.7, 0.8, 0.9, 1, 1.2, 1.5, 2]
const zoomOptions = computed(() => {
  return zoomConfig.map(scale => ({
    scale,
    label: `${scale * 100}%`,
    prefixIcon: canvasAttrs.value?.scale === scale ? 't-icon-checked' : '',
    onClick: () => setScale(scale)
  }))
})

// 放大
const zoomIn = () => {
  const currentIndex = zoomConfig.indexOf(canvasAttrs.value!.scale)
  if (currentIndex + 1 < zoomConfig.length) {
    setScale(zoomConfig[currentIndex + 1])
  }
}

// 缩小
const zoomOut = () => {
  const currentIndex = zoomConfig.indexOf(canvasAttrs.value!.scale)
  if (currentIndex - 1 >= 0) {
    setScale(zoomConfig[currentIndex - 1])
  }
}
</script>

<template>
  <AppPoppover
    :popper-width="192"
    placement="right-start"
    @visible-change="emits('visible-change', $event)"
  >
    <template #reference>
      <slot />
    </template>

    <template #default>
      <AppCellGroup
        :options="[
          {
            prefixIcon: 't-icon-zoom-in',
            label: '放大',
            onClick: zoomIn
          },
          {
            prefixIcon: 't-icon-zoom-out',
            label: '缩小',
            onClick: zoomOut
          }
        ]"
        :divider="true"
      />

      <AppCellGroup :options="zoomOptions" />
    </template>
  </AppPoppover>
</template>
