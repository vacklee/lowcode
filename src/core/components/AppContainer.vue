<template>
  <div :class="$style.framework">
    <div :class="$style.framework_sidebar">
      <AppSidebarMenu :menu="sidebarMenu" v-model="sidebarMenuSelected" />
    </div>

    <div :class="$style.framework_content">
      <component v-if="selectedMenu" :is="selectedMenu.component" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import AppPageDesign from './AppPageDesign/AppPageDesign.vue'
import AppSettings from './AppSettings.vue'
import AppSidebarMenu, { MenuItem } from './AppSidebarMenu.vue'

const sidebarMenu: MenuItem[] = [
  {
    id: 'page-design',
    title: '页面设计',
    icon: 'icon-page-design-outline',
    selectedIcon: 'icon-page-design-fill',
    component: AppPageDesign
  },
  {
    id: 'settings',
    title: '应用设置',
    icon: 'icon-settings-outline',
    selectedIcon: 'icon-settings-fill',
    component: AppSettings
  }
]

const sidebarMenuSelected = ref('page-design')
const selectedMenu = computed(() =>
  sidebarMenu.find(item => item.id === sidebarMenuSelected.value)
)
</script>

<style lang="scss" module>
.framework {
  height: 100%;
  display: flex;

  &_sidebar {
    width: $sidebar-width;
    background-color: $sidebar-background;
    padding: $spacing-small 0;
  }

  &_content {
    flex: 1;
    width: 0;
  }
}
</style>
