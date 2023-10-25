<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import AppTabs, { AppTab } from '../AppTabs.vue'

const tabs: AppTab[] = [
  {
    id: 'attrs',
    title: '属性',
    component: defineAsyncComponent(() => import('./AppAttrs.vue'))
  },
  {
    id: 'style',
    title: '样式',
    component: defineAsyncComponent(() => import('./AppStyles.vue'))
  }
]
</script>

<template>
  <AppTabs :tabs="tabs" tab-theme="capsual" />
</template>

<style lang="scss" module>
.box {
  height: 100%;
}
</style>
