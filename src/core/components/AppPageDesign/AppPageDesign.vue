<script lang="ts" setup>
import AppPageSelect from './AppPageSelect.vue'
import AppCreatePageBtn from './AppCreatePageBtn.vue'
import AppPlatformSelect from '../AppControls/AppPlatformSelect.vue'
import AppWithPlatform from '../AppWithPlatform.vue'
import { computed } from 'vue'
import { useAppData, useCanvasData } from 'core/hooks/use-app-data'
import AppCanvasSelect from '../AppControls/AppCanvasSelect.vue'
import AppRightPanel from '../AppRightPanel/AppRightPanel.vue'
import { usePageNode } from 'core/hooks/use-page-node'
import AppCollapseBtn from '../AppCollapseBtn.vue'
import AppLeftPanel from '../AppLeftPanel/AppLeftPanel.vue'

const { getAppState, setPlatfrom, setAppState, setCurrentSelectedNodeId } =
  useAppData()
const { canvasAttrs } = useCanvasData()
const { currentPage } = usePageNode()

const currentPlatform = computed({
  get: () => getAppState('platform'),
  set: setPlatfrom
})

const showLeftPanel = computed({
  get: () => getAppState('showLeftPanel'),
  set: val => setAppState('showLeftPanel', val)
})

const showRightPanel = computed({
  get: () => getAppState('showRightPanel'),
  set: val => setAppState('showRightPanel', val)
})

const onClickBody = () => {
  setCurrentSelectedNodeId('')
}
</script>

<template>
  <div :class="$style.editor">
    <div :class="$style.editor_header">
      <div :class="$style.editor_header_left">
        <AppPageSelect />
        <AppCreatePageBtn />
        <el-divider direction="vertical" />
        <AppPlatformSelect v-model="currentPlatform" />
        <el-divider direction="vertical" />
        <AppCanvasSelect v-if="canvasAttrs" />
      </div>
    </div>

    <div :class="$style.editor_body" v-if="currentPage">
      <div :class="[$style.editor_body_aside, showLeftPanel && $style.show]">
        <div :class="$style.editor_panel">
          <AppLeftPanel />
        </div>
        <AppCollapseBtn direct="left" v-model="showLeftPanel" />
      </div>

      <div :class="$style.editor_body_center" @click="onClickBody">
        <el-scrollbar :view-class="$style.editor_body_center_content">
          <AppWithPlatform />
        </el-scrollbar>
      </div>

      <div :class="[$style.editor_body_aside, showRightPanel && $style.show]">
        <div :class="$style.editor_panel">
          <AppRightPanel />
        </div>
        <AppCollapseBtn direct="right" v-model="showRightPanel" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.editor {
  width: 100%;
  height: 100%;
  background: #ebeef0;
  display: flex;
  flex-direction: column;

  &_header {
    height: 40px;
    background: #fff;
    border-bottom: 1px solid $border-color-base;
    display: flex;
    align-items: center;
    padding: 0 $spacing-medium;

    &_left {
      display: flex;
      align-items: center;
      gap: $spacing-mini;

      :global(.el-divider--vertical) {
        margin: 0;
      }
    }
  }

  &_body {
    flex: 1;
    height: 0;
    display: flex;
  }

  &_body_center {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;

    &_content {
      min-height: 100%;
      min-width: 100%;
      box-sizing: border-box;
      padding: $spacing-base;
      display: inline-flex;
    }
  }

  &_body_aside {
    width: 0;
    position: relative;
    transition: width 0.2s linear;
    z-index: 10;

    &.show {
      width: 280px;
    }
  }

  &_panel {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
