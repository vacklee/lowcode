<script lang="ts" setup>
import { computed } from 'vue'
import { AppComponent } from '@/core/data/component'
import SelectNode from '../Nodes/SelectNode.vue'
import SlotNode from '../Nodes/SlotNode.vue'
import RenderNode from '../Nodes/RenderNode.vue'

const props = defineProps<{
  node: AppComponent
}>()

const isEmpty = computed(() => !props.node.nodes.length)
</script>

<template>
  <div :class="$style.nomal_container">
    <SelectNode :id="node.instanceID" :is-empty="isEmpty">
      <SlotNode :id="node.instanceID" :is-empty="isEmpty" />
    </SelectNode>

    <RenderNode :nodes="node.nodes" />
  </div>
</template>

<style lang="scss" module>
.nomal_container {
  position: relative;
}
</style>
