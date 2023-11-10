<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { usePageNode } from '@/core/hooks/use-page-node'
import AppIcon from '../AppIcon.vue'
import { AppComponent } from '@/core/data/component'
import { useAppData } from '@/core/hooks/use-app-data'
import { ElTree, ElScrollbar } from 'element-plus'
import { delay } from '@/core/utils/common'

const props = defineProps<{
  scrollRef?: InstanceType<typeof ElScrollbar>
}>()

const { getCurrentSelectedNodeId, setCurrentSelectedNodeId } = useAppData()
const {
  bodyNode,
  getNodePaths,
  checkAllowInsert,
  checkAllowInsertPrev,
  checkAllowInsertNext
} = usePageNode()

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

/** 节点选中时滚动到可视范围 */
const scrollToNode = (instanceID: string) => {
  if (!props.scrollRef) return
  const { wrapRef, setScrollTop } = props.scrollRef
  if (!wrapRef) return
  const node = wrapRef.querySelector(`[data-node-tree="${instanceID}"]`)
  if (!node) return
  const wrapRect = wrapRef.getBoundingClientRect()
  const nodeRect = node.getBoundingClientRect()
  const relativeTop = nodeRect.top - wrapRect.top
  // 是否完整在屏幕内
  const isFullShow =
    relativeTop >= 0 && wrapRect.height >= relativeTop + nodeRect.height

  if (!isFullShow) {
    setScrollTop(relativeTop + wrapRef.scrollTop)
  }
}

const onCurrentChange = (node?: AppComponent) => {
  currentNodeKey.value = node?.instanceID || ''
  if (node?.instanceID) {
    delay(100).then(() => {
      scrollToNode(node.instanceID)
    })
  }
}

watch(
  [currentNodeKey],
  () => {
    const val = currentNodeKey.value
    if (val) {
      const nodePaths = getNodePaths(val)
      nodePaths.forEach(item => currentExpands.value.add(item.instanceID))
    }

    if (treeRef.value) {
      treeRef.value.setCurrentKey(val)
    }
  },
  { immediate: true }
)

/** 判断节点是否可以拖动 */
const checkAllowDrag = (node: { data: AppComponent }) => {
  return node.data.allowDrag
}

/** 判断节点是否可以放入 */
const checkAllowDrop = (
  draggingNode: { data: AppComponent },
  dropNode: { data: AppComponent },
  type: 'prev' | 'next' | 'inner'
) => {
  if (type === 'inner') {
    return checkAllowInsert(draggingNode.data, dropNode.data)
  }

  if (type === 'next') {
    return checkAllowInsertNext(draggingNode.data, dropNode.data)
  }

  if (type === 'prev') {
    return checkAllowInsertPrev(draggingNode.data, dropNode.data)
  }

  return false
}
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
      :draggable="true"
      :allow-drag="checkAllowDrag"
      :allow-drop="checkAllowDrop"
      node-key="instanceID"
      @node-expand="onNodeExpand"
      @node-collapse="onNodeCollapse"
      @current-change="onCurrentChange"
    >
      <template #default="{ data }">
        <div :class="$style.info" :data-node-tree="_(data).instanceID">
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
