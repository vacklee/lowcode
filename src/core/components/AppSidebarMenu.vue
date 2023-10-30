<script lang="ts">
import type { Component } from 'vue'
import AppIcon from './AppIcon.vue'

type MenuItem = {
  id: string
  title: string
  icon: string
  selectedIcon: string
  component: Component
}

export type { MenuItem }
</script>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    menu: MenuItem[]
    modelValue?: string
  }>(),
  {
    menu: () => []
  }
)

const emits = defineEmits(['update:modelValue'])
const innerSelected = computed({
  get: () => props.modelValue,
  set: val => {
    emits('update:modelValue', val)
  }
})

const isSelected = (item: MenuItem) => item.id === innerSelected.value
const toggle = (item: MenuItem) => {
  if (isSelected(item)) return
  innerSelected.value = item.id
}
</script>

<template>
  <div :class="$style.menu">
    <el-tooltip
      :key="item.id"
      :content="item.title"
      :show-after="1000"
      placement="right"
      v-for="item in menu"
    >
      <div
        :class="[$style.menu_item, isSelected(item) && $style.active]"
        @click="toggle(item)"
      >
        <AppIcon
          :icon="isSelected(item) ? item.selectedIcon : item.icon"
          :size="20"
        />
      </div>
    </el-tooltip>
  </div>
</template>

<style lang="scss" module>
.menu {
  &_item {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto $spacing-small;
    font-size: 20px;
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.2s linear;

    &:hover,
    &.active {
      background: #e3e6eb;
    }

    &.active {
      color: $color-primary;
    }
  }
}
</style>
