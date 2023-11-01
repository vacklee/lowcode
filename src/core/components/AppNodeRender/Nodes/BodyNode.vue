<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import SelectNode from './SelectNode.vue'
import SlotNode from './SlotNode.vue'
import { Constants } from 'core/config/constant'
import AppNodeEmpty from '../AppNodeEmpty.vue'
import { usePageNode } from 'core/hooks/use-page-node'
import RenderNode from './RenderNode.vue'

const { bodyNode } = usePageNode()

const id = ref(Constants.BODY_NODE_ID)
const isEmpty = computed(() => !bodyNode.value?.nodes.length)
const bodyRef = ref<HTMLElement>(null!)
const slotRef = ref<InstanceType<typeof SlotNode>>(null!)

onMounted(() => {
  slotRef.value.dragEventProxy(bodyRef.value)
})
</script>

<template>
  <div ref="bodyRef" :class="$style.body">
    <div :class="[$style.body_inner, isEmpty && $style.empty]">
      <AppNodeEmpty v-if="isEmpty" />

      <SelectNode :id="id" :is-empty="isEmpty" :is-body="true">
        <SlotNode ref="slotRef" :id="id" :is-empty="isEmpty" />
      </SelectNode>

      <RenderNode :nodes="bodyNode.nodes" v-if="bodyNode" />
    </div>
  </div>
</template>

<style lang="scss" module>
.body {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;

  &_inner {
    min-height: 100%;
    &:not(.empty) {
      position: relative;
    }

    &.empty {
      height: 100%;
    }
  }

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-corner,
  &::-webkit-scrollbar-button,
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-track-piece {
    display: none;
    background-color: transparent;
  }
}
</style>
