<script lang="ts" setup>
import AppCollapse from '../AppCollapse.vue'
import { AppTab } from '../AppTabs.vue'
import AppVisualStylesText from './AppVisualStylesText.vue'

const tabs: AppTab[] = [
  {
    id: 'text',
    title: '文字',
    component: AppVisualStylesText
  },
  {
    id: 'layout',
    title: '布局'
  },
  {
    id: 'fill',
    title: '填充'
  },
  {
    id: 'height-level',
    title: '高级'
  }
]
</script>

<template>
  <AppCollapse :tabs="tabs" />
</template>
