<script lang="ts" setup>
import { computed } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import { useAppData } from 'core/hooks/use-app-data'

const props = defineProps<{
  id: string
  isEmpty?: boolean
}>()

const { getCurrentSelectedNodeId, setCurrentSelectedNodeId } = useAppData()

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

const onClickOutSide = () => {
  if (selected.value) {
    selected.value = false
  }
}
</script>

<template>
  <OnClickOutside
    :class="[
      $style.select,
      selected && $style.selected,
      isEmpty && $style.empty
    ]"
    @click="onClick"
    @trigger="onClickOutSide"
  >
    <div />
    <slot />
  </OnClickOutside>
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
