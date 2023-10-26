<script lang="ts" setup>
import { usePageNode } from '@/core/hooks/use-page-node'
import AppNoData from 'core/components/AppNoData.vue'
import AppAttrsBaseInfo from './AppAttrsBaseInfo.vue'
import AppAttrsForm from './AppAttrsForm.vue'
import { computed } from 'vue'
import { AppTab } from '../AppTabs.vue'
import AppCollapse from '../AppCollapse.vue'

const { currentNode } = usePageNode()
const panels = computed(() => {
  const arr: AppTab[] = []
  if (currentNode.value?.baseAttrsForm.length) {
    arr.push({
      id: 'base-attrs',
      title: '基础属性',
      component: AppAttrsForm,
      componentProps: {
        node: currentNode.value,
        attrsKey: 'baseAttrs',
        columnKey: 'baseAttrsForm'
      }
    })
  }

  if (currentNode.value?.heightAttrsForm.length) {
    arr.push({
      id: 'height-attrs',
      title: '高级属性',
      component: AppAttrsForm,
      componentProps: {
        node: currentNode.value,
        attrsKey: 'heightAttrs',
        columnKey: 'heightAttrsForm'
      }
    })
  }

  return arr
})
</script>

<template>
  <div v-if="currentNode">
    <AppAttrsBaseInfo :node="currentNode" />
    <AppCollapse
      :tabs="panels"
      style="border-top: none"
      :key="currentNode.instanceID"
    />
  </div>
  <AppNoData text="请先选择对应组件" v-else />
</template>
