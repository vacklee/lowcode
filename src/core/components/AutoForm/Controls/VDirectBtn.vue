<script lang="ts" setup>
import { type Component } from 'vue'
import AppIcon from '../../AppIcon.vue'
import { Top, Bottom } from '@element-plus/icons-vue'

withDefaults(
  defineProps<{
    topText: string
    bottomText: string
    topIcon?: string | Component
    bottomIcon?: string | Component
    modelValue?: unknown
  }>(),
  {
    topIcon: Top,
    bottomIcon: Bottom
  }
)

const emits = defineEmits(['update:modelValue'])
const onClick = (direct: 'top' | 'bottom') => emits('update:modelValue', direct)
</script>

<template>
  <div :class="$style.box">
    <el-button :class="$style.box_top" @click="onClick('top')">
      <AppIcon :icon="topIcon" />
      <span>{{ topText }}</span>
    </el-button>
    <div :class="$style.box_center"></div>
    <div :class="$style.box_bottom"></div>
    <el-button :class="$style.box_bottom" @click="onClick('bottom')">
      <AppIcon :icon="bottomIcon" />
      <span>{{ bottomText }}</span>
    </el-button>
  </div>
</template>

<style lang="scss" module>
.box {
  width: 100%;

  &_top,
  &_bottom {
    width: 100%;
    display: flex;
  }

  &_center {
    height: 32px;
    background: #eff0f3;
    border: 1px dashed $border-color-dark;
    display: block;
    margin: $spacing-mini 0;
  }
}
</style>
