<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import AppPoppover from '../AppPoppover.vue'
import AppCell from '../AppCell.vue'
import { useAppData, useCanvasData } from 'core/hooks/use-app-data'
import { getCanvasConfigs } from 'core/config/canvas'
import AppScalePopper from '../AppPopper/AppScalePopper.vue'

const { getAppState, setCanvasConfigName } = useAppData()
const { canvasAttrs } = useCanvasData()
const canvasConfigs = computed(() => getCanvasConfigs(getAppState('platform')))
const isSelected = (name: string) => name === getAppState('canvasAttrs').name

const popperRef = ref<InstanceType<typeof AppPoppover>>(null!)
const onScalePopperVisibleChange = (visible: boolean) => {
  if (visible) {
    popperRef.value.popoverVisibleStopPause()
  } else {
    popperRef.value.popoverVisibleStopResume()
  }
}

const currentScale = computed(() => {
  if (canvasAttrs.value) {
    return `${canvasAttrs.value.scale * 100}%`
  }
  return null
})
</script>

<template>
  <AppPoppover ref="popperRef" :popper-width="260">
    <template #reference>
      <div :class="$style.trigger">
        <span>{{ currentScale }}</span>
        <el-icon :size="10">
          <ArrowDown />
        </el-icon>
      </div>
    </template>

    <template #default>
      <div :class="$style.group">
        <AppScalePopper @visible-change="onScalePopperVisibleChange">
          <AppCell
            prefix-icon="t-icon-search"
            label="显示比例"
            :small-text="currentScale || ''"
            :show-arrow="true"
          />
        </AppScalePopper>
      </div>

      <template v-if="canvasConfigs.length">
        <el-divider :class="$style.divider" />
        <div :class="$style.group">
          <AppCell
            v-for="item in canvasConfigs"
            :label="item.name"
            :prefix-icon="isSelected(item.name) ? 't-icon-checked' : ''"
            :small-text="`${item.width} x ${item.height}`"
            :key="item.name"
            @click="setCanvasConfigName(item.name)"
          />
        </div>
      </template>
    </template>
  </AppPoppover>
</template>

<style lang="scss" module>
.trigger {
  display: inline-flex;
  align-items: center;
  gap: calc($spacing-mini / 2);
  cursor: pointer;
}

.group {
  padding: $spacing-mini;
}

.divider {
  margin: 0 !important;
}
</style>
