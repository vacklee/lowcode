<script lang="ts" setup>
import { usePageData } from 'core/hooks/use-app-data'
import AppIconBtn from '../AppControls/AppIconBtn.vue'
import { DocumentAdd } from '@element-plus/icons-vue'

const { createPage, setCurrentpage } = usePageData()
const onClick = () => {
  createPage(void 0, setCurrentpage)
}
</script>

<template>
  <AppIconBtn title="新建页面" :icon="DocumentAdd" @click="onClick" />
</template>
