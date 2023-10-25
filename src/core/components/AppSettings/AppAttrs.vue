<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import AppNoData from 'core/components/AppNoData.vue'
import AppAttrsBaseInfo from './AppAttrsBaseInfo.vue'

const { currentNode } = usePageNode()
</script>

<template>
  <div v-if="currentNode">
    <AppAttrsBaseInfo :node="currentNode" />
  </div>
  <AppNoData text="请先选择对应组件" v-else />
</template>
