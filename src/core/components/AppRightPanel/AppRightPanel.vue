<script lang="ts" setup>
import { computed } from 'vue'
import AppSettings from '../AppSettings/AppSettings.vue'
import AppComponents from '../AppComponents/AppComponents.vue'
import { useAppData } from '@/core/hooks/use-app-data'

const tabs = [
  {
    id: 'components',
    title: '组件',
    component: AppComponents
  },
  {
    id: 'settings',
    title: '配置',
    component: AppSettings,
    viewClass: 'max_height'
  }
]

const { getAppState, setAppState } = useAppData()

const activeId = computed<string>({
  get: () => getAppState('rightPanelTab'),
  set: val => setAppState('rightPanelTab', val as 'components' | 'settings')
})

const setActiveId = (id: string) => {
  activeId.value = id
}

const currentTab = computed(() => tabs.find(item => item.id === activeId.value))
const currentComponent = computed(() => currentTab.value?.component)
const viewClass = computed(() => currentTab.value?.viewClass || '')
</script>

<template>
  <div :class="$style.panel">
    <div :class="$style.tabs">
      <div
        :class="[
          $style.tab_item,
          {
            [$style.active]: activeId === item.id
          }
        ]"
        v-for="item in tabs"
        :key="item.id"
        @click="setActiveId(item.id)"
      >
        <span>{{ item.title }}</span>
      </div>
    </div>

    <div :class="$style.panel_content">
      <el-scrollbar :view-class="viewClass && $style[viewClass]">
        <component v-if="currentComponent" :is="currentComponent" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" module>
.panel {
  width: 280px;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  border-left: 1px solid $border-color-base;
  display: flex;
  flex-direction: column;

  &_content {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
  }
}

.tabs {
  height: 40px;
  padding: 0 $spacing-small;
  border-bottom: 1px solid $border-color-base;
  display: flex;
  align-items: center;

  .tab_item {
    height: 40px;
    line-height: 40px;
    margin-right: $spacing-medium;
    cursor: pointer;
    position: relative;

    &::after {
      content: '';
      left: 50%;
      bottom: 0;
      width: 0;
      height: 2px;
      position: absolute;
      background: $color-primary;
      transform: translateX(-50%);
      transition: width 0.1s linear;
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }
  }
}

.max_height {
  height: 100%;
}
</style>
