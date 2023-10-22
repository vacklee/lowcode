<script lang="ts" setup>
import AppPageSelect from './AppPageSelect.vue'
</script>

<template>
  <div :class="$style.editor">
    <div :class="$style.editor_header">
      <AppPageSelect />
    </div>
  </div>
</template>

<style lang="scss" module>
.editor {
  width: 100%;
  height: 100%;
  background: #ebeef0;

  &_header {
    height: 40px;
    background: #fff;
    border-bottom: 1px solid $border-color-base;
    display: flex;
    align-items: center;
    padding: 0 $spacing-medium;
  }
}
</style>
