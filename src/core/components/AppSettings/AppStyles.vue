<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import AppNoData from '../AppNoData.vue'
import AppVisualStyles from '../AppVisualStyles/AppVisualStyles.vue'

const { currentNode } = usePageNode()
</script>

<template>
  <div v-if="currentNode">
    <AppVisualStyles />
  </div>
  <AppNoData text="请先选择对应组件" v-else />
</template>
