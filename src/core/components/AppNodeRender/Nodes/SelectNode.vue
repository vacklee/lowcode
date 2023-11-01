<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useAppData } from 'core/hooks/use-app-data'
import { usePageNode } from '@/core/hooks/use-page-node'

const props = defineProps<{
  id: string
  isEmpty?: boolean
  isBody?: boolean
}>()

const { getCurrentSelectedNodeId, setCurrentSelectedNodeId } = useAppData()
const { getNodeById, computedInsetStyles } = usePageNode()

const selected = computed({
  get: () => getCurrentSelectedNodeId() === props.id,
  set: val => {
    if (val) {
      setCurrentSelectedNodeId(props.id)
    } else if (selected.value) {
      setCurrentSelectedNodeId('')
    }
  }
})

const onClick = () => {
  if (!selected.value) {
    selected.value = true
  }
}

/** 给父元素赋予内联样式 */
const elRef = ref<HTMLElement>(null!)
const parentInlineStyle = computed(() => {
  const node = getNodeById(props.id)
  if (!node) {
    return {}
  }
  return computedInsetStyles(node)
})

onMounted(() => {
  watch(
    parentInlineStyle,
    (newVal, oldVal) => {
      const parentNode = elRef.value.parentNode
      if (parentNode instanceof HTMLElement) {
        if (oldVal) {
          Object.keys(oldVal).forEach(key => {
            Object.assign(parentNode.style, { [key]: null })
          })
        }
        Object.assign(parentNode.style, newVal)
      }
    },
    {
      immediate: true,
      deep: true
    }
  )
})
</script>

<template>
  <div
    ref="elRef"
    :class="[
      $style.select,
      selected && $style.selected,
      isEmpty && $style.empty,
      isBody && $style.is_body
    ]"
    @click.stop="onClick"
  >
    <slot />
  </div>
</template>

<style lang="scss" module>
.select {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;

  &.empty {
    height: auto;
    min-height: 100%;
    position: relative;
  }

  &.is_body {
    position: absolute;
  }

  &::before {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border: 0px solid $color-primary;
    box-sizing: border-box;
    z-index: 10;
    pointer-events: none;
  }

  &:hover::before {
    border-width: 2px;
  }

  &.selected::before {
    border-width: 1px;
  }
}
</style>
