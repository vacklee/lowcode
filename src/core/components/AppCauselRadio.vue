<script lang="ts" setup>
import { IconSelectOption } from '../config/select'
import AppIcon from './AppIcon.vue'

const props = withDefaults(
  defineProps<{
    options?: IconSelectOption[]
    modelValue?: string | number
  }>(),
  {
    options: () => []
  }
)

const emits = defineEmits(['update:modelValue'])
const isActive = (item: IconSelectOption) => item.value === props.modelValue
const setActive = (item: IconSelectOption) => {
  emits(
    'update:modelValue',
    item.value === props.modelValue ? void 0 : item.value
  )
}
</script>

<template>
  <div :class="$style.causel">
    <el-tooltip
      v-for="item in options"
      :key="item.value"
      :content="item.label"
      :show-after="1000"
    >
      <div
        :class="[$style.causel_item, isActive(item) && $style.active]"
        @click="setActive(item)"
      >
        <AppIcon :icon="item.icon" :size="14" />
      </div>
    </el-tooltip>
  </div>
</template>

<style lang="scss" module>
.causel {
  height: 32px;
  background: #f1f2f5;
  border-radius: $border-radius-base;
  display: flex;
  box-sizing: border-box;
  padding: calc($spacing-mini / 2);
  gap: calc($spacing-mini / 2);

  &_wrap {
    padding: $spacing-mini $spacing-small;
  }

  &_item {
    flex: 1;
    width: 0;
    height: 100%;
    border-radius: $border-radius-base;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f2f5;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      background: #e3e6eb;
    }

    &.active {
      background: #fff;
    }
  }
}
</style>
