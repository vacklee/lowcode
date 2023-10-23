<script lang="ts">
type AppCellProps = {
  prefixIcon?: string | Component
  label?: string
  smallText?: string
  showArrow?: boolean
}

export type { AppCellProps }
</script>

<script lang="ts" setup>
import { computed, type Component } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<AppCellProps>(), {})
const emits = defineEmits(['click'])

const suffixIcon = computed(() => {
  if (props.showArrow) {
    return ArrowRight
  }
  return null
})
</script>

<template>
  <div :class="$style.cell" @click="emits('click')">
    <el-icon :class="$style.cell_prefix" :size="16">
      <template v-if="prefixIcon">
        <i :class="prefixIcon" v-if="typeof prefixIcon === 'string'"></i>
        <component :is="prefixIcon" v-else />
      </template>
    </el-icon>

    <span :class="$style.cell_label">{{ label }}</span>
    <span :class="$style.cell_small" v-if="smallText">{{ smallText }}</span>

    <el-icon :class="$style.cell_suffix" :size="10" v-if="suffixIcon">
      <component :is="suffixIcon" />
    </el-icon>
  </div>
</template>

<style lang="scss" module>
.cell {
  height: 32px;
  padding: 0 $spacing-small;
  border-radius: $border-radius-base;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s linear;

  &:hover {
    background: #f1f2f5;
  }

  &_prefix {
    margin-right: $spacing-mini;
  }

  &_label {
    flex: 1;
    width: 0;
    @include text-cut();
  }

  &_small {
    color: $text-color-gray;
    margin-left: $spacing-base;
  }

  &_suffix {
    margin-left: $spacing-mini;
  }
}
</style>
