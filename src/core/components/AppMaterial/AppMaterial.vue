<script lang="ts" setup>
import AppTabs, { AppTab } from '../AppTabs.vue'
import AppMaterialImage from './AppMaterialImage.vue'

const tabs: AppTab[] = [
  {
    id: 'image',
    title: '图片',
    component: AppMaterialImage
  },
  {
    id: 'components',
    title: '组件库'
  }
]
</script>

<template>
  <AppTabs
    :tabs="tabs"
    :content-class="$style.content"
    :view-class="$style.content_view"
  />
</template>

<style lang="scss" module>
.content {
  background: #e8eaef;

  &_view {
    padding: $spacing-medium;
    min-height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
</style>
