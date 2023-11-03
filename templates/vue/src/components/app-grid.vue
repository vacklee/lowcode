<script setup>
defineProps({
  rowGap: {
    type: String,
    default: '8px'
  },

  colGap: {
    type: String,
    default: '8px'
  }
})
</script>

<template>
  <div
    class="app-grid"
    :style="{
      '--row-gap': rowGap,
      '--col-gap': colGap
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.app-grid {
  display: flex;
  flex-direction: column;
}
.app-grid > .app-grid-row:not(:last-child) {
  margin-bottom: var(--row-gap);
}
</style>
