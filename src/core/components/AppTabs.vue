<script lang="ts">
import { type Component } from 'vue'

type AppTab = {
  id: string
  title: string
  component?: Component
}

export type { AppTab }
</script>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    tabs?: AppTab[]
    modelValue?: string
    tabTheme?: 'normal' | 'capsual'
  }>(),
  {
    tabs: () => [],
    tabTheme: 'normal'
  }
)

const emits = defineEmits(['update:modelValue'])
const activeId = ref(props.modelValue || props.tabs[0]?.id || '')
const setActiveId = (id: string) => {
  activeId.value = id
  emits('update:modelValue', id)
}

const currentComponent = computed(
  () => props.tabs.find(item => item.id === activeId.value)?.component
)
</script>

<template>
  <div :class="$style.box">
    <div :class="$style[`${tabTheme}_tabs_wrap`]">
      <div :class="[$style[`${tabTheme}_tabs`]]">
        <div
          :class="[
            $style.tab_item,
            {
              [$style.active]: activeId === item.id
            }
          ]"
          v-for="item in tabs"
          :key="item.id"
          @click="setActiveId(item.id)"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>

    <div :class="$style.box_content">
      <el-scrollbar>
        <component v-if="currentComponent" :is="currentComponent" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" module>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &_content {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
  }
}

.normal_tabs {
  height: 40px;
  padding: 0 $spacing-small;
  border-bottom: 1px solid $border-color-base;
  display: flex;
  align-items: center;

  .tab_item {
    height: 40px;
    line-height: 40px;
    margin-right: $spacing-medium;
    cursor: pointer;
    position: relative;

    &::after {
      content: '';
      left: 50%;
      bottom: 0;
      width: 0;
      height: 2px;
      position: absolute;
      background: $color-primary;
      transform: translateX(-50%);
      transition: width 0.1s linear;
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }
  }
}

.capsual_tabs {
  height: 32px;
  background: #e3e6eb;
  border-radius: $border-radius-base;
  display: flex;
  box-sizing: border-box;
  padding: calc($spacing-mini / 2);
  gap: calc($spacing-mini / 2);

  &_wrap {
    padding: $spacing-mini $spacing-small;
  }

  .tab_item {
    flex: 1;
    width: 0;
    height: 100%;
    border-radius: $border-radius-base;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.active {
      background: #fff;
    }
  }
}
</style>
