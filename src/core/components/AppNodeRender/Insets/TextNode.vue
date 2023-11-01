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
  <component :class="$style.text" :is="tag">
    <span>{{ content }}</span>
    <SelectNode :id="node.instanceID" />
  </component>
</template>

<style lang="scss" module>
.text {
  position: relative;
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  line-height: 1.5;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;

  & > span:empty::after {
    content: ' ';
  }
}
</style>
