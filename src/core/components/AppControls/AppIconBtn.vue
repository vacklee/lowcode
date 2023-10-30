<script lang="ts" setup>
import { type Component } from 'vue'
import AppIcon from '../AppIcon.vue'

const props = withDefaults(
  defineProps<{
    icon: string | Component
    title?: string
    active?: boolean
    size?: number
    clickCancel?: boolean
    hoverActive?: boolean
    placement?: string
    theme?: 'default' | 'danger'
  }>(),
  {
    size: 28,
    theme: 'default'
  }
)

const emits = defineEmits(['click', 'update:active'])
const onClick = () => {
  emits('click')
  if (props.active && props.clickCancel) {
    emits('update:active', false)
  } else {
    emits('update:active', true)
  }
}
</script>

<template>
  <el-tooltip
    :content="title"
    :show-after="1000"
    :disabled="!title"
    :placement="placement"
  >
    <div
      :class="[
        $style.btn,
        active && $style.active,
        hoverActive && $style.hover_active,
        $style[`btn_theme_${theme}`]
      ]"
      :style="`--size: ${size}px`"
      @click="onClick"
    >
      <AppIcon :icon="icon" :size="16" />
    </div>
  </el-tooltip>
</template>

<style lang="scss" module>
.btn {
  width: var(--size);
  height: var(--size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s linear;
  border-radius: $border-radius-base;

  &:hover {
    background: #f1f2f5;
  }

  &.active,
  &.hover_active:hover {
    background: rgba($color-primary, 0.2);
    color: $color-primary;

    &.btn_theme_danger {
      background: rgba($color-danger, 0.2);
      color: $color-danger;
    }
  }
}
</style>
