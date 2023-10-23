<script lang="ts" setup>
import AppCell, { AppCellProps } from './AppCell.vue'

withDefaults(
  defineProps<{
    options?: AppCellProps[]
    divider?: boolean
  }>(),
  {
    options: () => []
  }
)
</script>

<template>
  <div :class="$style.group">
    <AppCell v-for="(item, index) in options" :key="index" v-bind="item" />
  </div>
  <el-divider :class="$style.divider" v-if="divider" />
</template>

<style lang="scss" module>
.group {
  padding: $spacing-mini;
}

.divider {
  margin: 0 !important;
}
</style>
