<script lang="ts" setup>
import { type Component } from 'vue'

defineProps<{
  icon: string | Component
  title: string
  active?: boolean
}>()

const emits = defineEmits(['click'])
</script>

<template>
  <el-tooltip :content="title" :show-after="1000">
    <div :class="[$style.btn, active && $style.active]" @click="emits('click')">
      <i :class="icon" v-if="typeof icon === 'string'"></i>
      <el-icon v-else>
        <component :is="icon" />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<style lang="scss" module>
.btn {
  width: 28px;
  height: 28px;
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

  &.active {
    background: rgba($color-primary, 0.2);
    color: $color-primary;
  }
}
</style>
