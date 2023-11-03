<script setup>
defineProps({
  cols: {
    type: Number
  },

  colGap: {
    type: String,
    default: 'inherit'
  },

  alignItems: {
    type: String,
    default: 'flex-start'
  }
})
</script>

<template>
  <div
    class="app-grid-row"
    :style="{
      '--cols': cols,
      '--col-gap': colGap === 'inherit' ? void 0 : colGap,
      '--align-items': alignItems
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.app-grid-row {
  display: flex;
  align-items: var(--align-items);
}
.app-grid-row:deep(> .app-grid-col:not(:last-child)) {
  margin-right: var(--col-gap);
}
</style>
