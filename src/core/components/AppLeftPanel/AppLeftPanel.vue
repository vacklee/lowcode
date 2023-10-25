<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import AppTabs, { AppTab } from '../AppTabs.vue'

const tabs: AppTab[] = [
  {
    id: 'node-tree',
    title: '大纲树',
    component: defineAsyncComponent(() => import('./AppNodeTree.vue'))
  },
  {
    id: 'states',
    title: '状态'
  }
]
</script>

<template>
  <div :class="$style.panel">
    <div :class="$style.panel_column">
      <AppTabs :tabs="tabs" />
    </div>
  </div>
</template>

<style lang="scss" module>
.panel {
  width: 280px;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  border-right: 1px solid $border-color-base;
  display: flex;
  flex-direction: column;

  &_column {
    flex: 1;
    height: 0;
  }
}
</style>
