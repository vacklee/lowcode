<script lang="ts" setup>
import { computed } from 'vue'
import { AppComponent } from '@/core/data/component'
import SelectNode from '../Nodes/SelectNode.vue'

const props = defineProps<{
  node: AppComponent
}>()

const content = computed(() => props.node.baseAttrs.content || '')
const tag = computed(() => 'p')
</script>

<template>
  <div :class="$style.text">
    <component :class="$style.text_inner" :is="tag">{{ content }}</component>
    <SelectNode :id="node.instanceID" />
  </div>
</template>

<style lang="scss" module>
.text {
  position: relative;

  &_inner {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.5;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;

    &:empty::after {
      content: ' ';
      height: 1.5em;
      display: block;
    }
  }
}
</style>
