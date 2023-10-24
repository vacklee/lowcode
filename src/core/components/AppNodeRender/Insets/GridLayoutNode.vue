<script lang="ts" setup>
import { AppComponent } from '@/core/data/component'
import { usePageNode } from '@/core/hooks/use-page-node'
import { computed } from 'vue'
import RenderNode from '../Nodes/RenderNode.vue'
import SelectNode from '../Nodes/SelectNode.vue'

const { insertNode } = usePageNode()

const props = defineProps<{
  node: AppComponent
}>()

const wrapStyle = computed(() => ({
  '--rows': props.node.baseAttrs.rows,
  '--cols': props.node.baseAttrs.cols,
  '--row-gap': props.node.baseAttrs.rowGap,
  '--col-gap': props.node.baseAttrs.colGap
}))

const count = computed(
  () => props.node.baseAttrs.rows * props.node.baseAttrs.cols
)

const nodes = computed(() => {
  const _nodes = props.node.nodes
  while (_nodes.length < count.value) {
    insertNode(props.node.instanceID, 'NOMAL_CONTAINER')
  }
  return _nodes
})
</script>

<template>
  <div :class="$style.grid_layout" :style="wrapStyle">
    <SelectNode :id="node.instanceID" />
    <RenderNode :nodes="nodes" />
  </div>
</template>

<style lang="scss" module>
.grid_layout {
  --rows: 1;
  --cols: 1;
  --row-gap: 0px;
  --col-gap: 0px;
  --col-width: calc((100% - (var(--cols) - 1) * var(--col-gap)) / var(--cols));

  display: grid;
  grid-template-columns: repeat(var(--cols), var(--col-width));
  row-gap: var(--row-gap);
  column-gap: var(--col-gap);
  position: relative;
}
</style>
