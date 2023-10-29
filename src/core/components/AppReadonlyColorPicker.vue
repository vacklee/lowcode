<script lang="ts" setup>
defineProps<{
  color?: string
}>()
</script>

<template>
  <div :class="$style.picker_wrapper">
    <div :class="$style.picker">
      <el-color-picker :model-value="color" :show-alpha="true" />
    </div>
  </div>
</template>

<style lang="scss" module>
.picker {
  width: 100%;
  height: 100%;
  pointer-events: none;

  & :global(.el-color-picker) {
    width: 100%;
    height: 100%;
  }

  & :global(.el-color-picker__trigger) {
    width: 100%;
    height: 100%;
    padding: 0;
  }

  & :global(.el-color-picker__color-inner) > :global(.el-icon) {
    display: none;
  }

  &_wrapper {
    width: 100%;
    height: 100%;
    max-width: 32px;
    max-height: 32px;
    position: relative;
  }
}
</style>
