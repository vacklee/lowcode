<script lang="ts" setup>
import AppTabs, { AppTab } from '../AppTabs.vue'
import AppAttrs from './AppAttrs.vue'
import AppStyles from './AppStyles.vue'

const tabs: AppTab[] = [
  {
    id: 'attrs',
    title: '属性',
    component: AppAttrs
  },
  {
    id: 'style',
    title: '样式',
    component: AppStyles
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
