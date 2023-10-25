<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { usePageNode } from '@/core/hooks/use-page-node'
import AppIcon from '../AppIcon.vue'
import { AppComponent } from '@/core/data/component'
import { useAppData } from '@/core/hooks/use-app-data'
import { ElTree } from 'element-plus'

const { getCurrentSelectedNodeId, setCurrentSelectedNodeId } = useAppData()
const { bodyNode, getParentNode, getNodePaths } = usePageNode()

const treeRef = ref<InstanceType<typeof ElTree>>(null!)
const treeData = computed(() => (bodyNode.value ? [bodyNode.value] : []))
const _ = (node: AppComponent) => node

/** 默认展开节点逻辑 */
const currentExpands = ref(new Set<string>())
const defaultExpandedKeys = computed(() =>
  [...currentExpands.value].filter((id, _index, arr) => {
    // 过滤掉父节点未展开的节点
    const idPaths = getNodePaths(id).map(item => item.instanceID)
    return idPaths.every(_id => arr.includes(_id))
  })
)

const onNodeExpand = (_: unknown, { data }: { data: AppComponent }) => {
  currentExpands.value.add(data.instanceID)
}
const onNodeCollapse = (_: unknown, { data }: { data: AppComponent }) => {
  // 删除当前节点的默认展开状态
  currentExpands.value.delete(data.instanceID)
}

/** 节点选中逻辑 */
const currentNodeKey = computed({
  get: () => getCurrentSelectedNodeId() || void 0,
  set: val => setCurrentSelectedNodeId(val || '')
})

const onCurrentChange = (node: AppComponent) => {
  currentNodeKey.value = node?.instanceID || ''
}

watch(
  [currentNodeKey],
  () => {
    const val = currentNodeKey.value
    if (val) {
      const parentNode = getParentNode(val)
      if (parentNode) {
        currentExpands.value.add(parentNode.instanceID)
      }
    }
    if (treeRef.value) {
      treeRef.value.setCurrentKey(val)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div :class="$style.box">
    <el-tree
      ref="treeRef"
      :key="currentNodeKey"
      :data="treeData"
      :props="{
        label: 'instanceName',
        children: 'nodes'
      }"
      :default-expanded-keys="defaultExpandedKeys"
      :expand-on-click-node="false"
      :check-on-click-node="true"
      :highlight-current="true"
      :current-node-key="currentNodeKey"
      node-key="instanceID"
      @node-expand="onNodeExpand"
      @node-collapse="onNodeCollapse"
      @current-change="onCurrentChange"
    >
      <template #default="{ data }">
        <div :class="$style.info">
          <AppIcon :class="$style.info_icon" :icon="_(data).basicInfo.icon" />
          <span>{{ _(data).instanceName }}</span>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-mini $spacing-small;
}

.info {
  flex: 1;
  width: 0;
  display: flex;
  align-items: center;

  &_icon {
    margin-right: $spacing-mini;
  }
}
</style>
