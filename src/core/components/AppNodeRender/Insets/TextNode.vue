<script lang="ts" setup>
import { computed } from 'vue'
import { AppComponent } from '@/core/data/component'
import SelectNode from '../Nodes/SelectNode.vue'
import { TextFormat, textFormatOptions } from '@/core/config/select'
import { useCode } from '@/core/hooks/use-code'

const props = defineProps<{
  node: AppComponent
}>()

const { result: content } = useCode(() => props.node.baseAttrs.content, '')

const format = computed<TextFormat>(() => props.node.baseAttrs.format)
const tag = computed(
  () => textFormatOptions.find(item => item.value === format.value)!.data
)
</script>

<template>
  <component :class="[$style.text, $style[format]]" :is="tag">
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

  &.CONTENT_SMALL {
    font-size: var(--fw-font-size-sm);
  }

  &.CONTENT_MIDDLE {
    font-size: var(--fw-font-size-base);
  }

  &.CONTENT_LARGE {
    font-size: var(--fw-font-size-lg);
  }

  &.H1 {
    font-size: 64px;
    font-weight: 600;
  }

  &.H2 {
    font-size: 48px;
    font-weight: 600;
  }

  &.H3 {
    font-size: 36px;
    font-weight: 600;
  }

  &.H4 {
    font-size: 24px;
    font-weight: 600;
  }

  &.H5 {
    font-size: 20px;
    font-weight: 600;
  }

  &.H6 {
    font-size: 18px;
    font-weight: 600;
  }

  &.H7 {
    font-size: 18px;
    font-weight: 600;
  }

  &.H8 {
    font-size: 16px;
    font-weight: 600;
  }

  &.H9 {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
