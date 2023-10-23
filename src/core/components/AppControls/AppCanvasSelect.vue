<script lang="ts" setup>
import { computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import AppPoppover from '../AppPoppover.vue'
import AppCell from '../AppCell.vue'
import { useAppData } from 'core/hooks/use-app-data'
import { getCanvasConfigs } from 'core/config/canvas'

const { getAppState, setCanvasConfigName } = useAppData()
const canvasConfigs = computed(() => getCanvasConfigs(getAppState('platform')))
const isSelected = (name: string) => name === getAppState('canvasAttrs').name
</script>

<template>
  <AppPoppover :popper-width="260">
    <template #reference>
      <div :class="$style.trigger">
        <span>80%</span>
        <el-icon :size="10">
          <ArrowDown />
        </el-icon>
      </div>
    </template>

    <template #default>
      <div :class="$style.group">
        <AppCell
          prefix-icon="t-icon-search"
          label="显示比例"
          small-text="80%"
          :show-arrow="true"
        />
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
