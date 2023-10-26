<script lang="ts" setup>
import { computed } from 'vue'
import { AppComponent } from '@/core/data/component'
import SelectNode from '../Nodes/SelectNode.vue'
import RenderNode from '../Nodes/RenderNode.vue'
import { usePageNode } from '@/core/hooks/use-page-node'

const { insertNode } = usePageNode()

const props = defineProps<{
  node: AppComponent
}>()

const rowStyles = computed(() => ({
  '--cols': props.node.baseAttrs.cols,
  '--col-gap': props.node.baseAttrs.colGap,
  '--align-items': props.node.baseAttrs.alignItems
}))

const nodes = computed(() => {
  const _nodes = props.node.nodes
  const cols = props.node.baseAttrs.cols
  while (_nodes.length < cols) {
    insertNode(props.node.instanceID, 'GRID_LAYOUT_COL')
  }
  return _nodes
})
</script>

<template>
  <div :class="$style.row" :style="rowStyles">
    <SelectNode :id="node.instanceID" />
    <RenderNode :nodes="nodes" />
  </div>
</template>

<style lang="scss" module>
.row {
  --cols: 1;
  --col-gap: auto;
  --align-items: auto;

  display: flex;
  column-gap: var(--col-gap);
  align-items: var(--align-items);
  position: relative;
}
</style>
