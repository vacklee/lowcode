<script lang="ts" setup>
import { computed } from 'vue'
import { AppComponent } from '@/core/data/component'
import { usePageNode } from '@/core/hooks/use-page-node'
import SelectNode from '../Nodes/SelectNode.vue'
import NomalContainerNode from './NomalContainerNode.vue'

const { insertNode } = usePageNode()

const props = defineProps<{
  node: AppComponent
}>()

const slotName = {
  header: '卡片顶部',
  default: '卡片内容',
  footer: '卡片底部'
}

const useSlot = (slot: keyof typeof slotName) => {
  const val = computed(() => {
    return props.node.nodes.find(item => item.slot === slot)!
  })

  if (!val.value) {
    const node = insertNode(props.node.instanceID, 'NOMAL_CONTAINER')
    node.slot = slot
    node.instanceName = slotName[slot]
    node.deletable = false
  }

  return val
}

const headerNode = useSlot('header')
const contentNode = useSlot('default')
const footerNode = useSlot('footer')

const showHeader = computed<boolean>(() => props.node.baseAttrs.showHeader)
const showContent = computed<boolean>(() => props.node.baseAttrs.showContent)
const showFooter = computed<boolean>(() => props.node.baseAttrs.showFooter)
const showDivider = computed<boolean>(() => props.node.heightAttrs.showDivider)
</script>

<template>
  <div
    :class="[
      $style.card,
      {
        [$style.hide_header]: !showHeader,
        [$style.hide_content]: !showContent,
        [$style.hide_footer]: !showFooter,
        [$style.show_divider]: showDivider
      }
    ]"
  >
    <SelectNode :id="node.instanceID" />

    <div :class="$style.card_header">
      <NomalContainerNode :node="headerNode" />
    </div>
    <div :class="$style.card_content">
      <NomalContainerNode :node="contentNode" />
    </div>
    <div :class="$style.card_footer">
      <NomalContainerNode :node="footerNode" />
    </div>
  </div>
</template>

<style lang="scss" module>
.card {
  border-radius: $border-radius-base;
  border: 0.5px solid $border-color-base;
  box-shadow: $card-box-shadow;
  position: relative;

  &_header {
    padding: $spacing-small $spacing-medium 0;
  }

  &_content {
    padding: $spacing-medium $spacing-base;
  }

  &_footer {
    padding: $spacing-medium $spacing-base;
  }

  &.hide_header > &_header,
  &.hide_content > &_content,
  &.hide_footer > &_footer {
    display: none;
  }

  &.show_divider > &_header {
    padding-bottom: $spacing-small;
    border-bottom: 1px solid $border-color-base;
  }

  &.show_divider > &_footer {
    border-top: 1px solid $border-color-base;
  }
}
</style>
