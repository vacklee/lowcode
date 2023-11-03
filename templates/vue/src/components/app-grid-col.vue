<script setup>
defineProps({
  colWidth: {
    type: Object,
    default: () => ({
      mobile: 'fill',
      pc: 'fill'
    })
  }
})

const tranformWidth = width => {
  if (width === 'fill') {
    return '0'
  }
  if (width === 'auto') {
    return 'auto'
  }
  if (typeof width === 'number') {
    return `calc((100% - var(--col-gap) * (var(--cols) - 1)) * ${width} / 12)`
  }
  return width
}

const tranformFlex = width => {
  if (width === 'fill') {
    return '1'
  }
  return 'none'
}
</script>

<template>
  <div
    class="app-grid-col"
    :style="{
      '--mobile-width': tranformWidth(colWidth.mobile),
      '--mobile-flex': tranformFlex(colWidth.mobile),
      '--pc-width': tranformWidth(colWidth.pc),
      '--pc-flex': tranformFlex(colWidth.pc)
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.app-grid-col {
  display: flex;
  flex-direction: column;
  flex: var(--pc-flex);
  width: var(--pc-width);
}
.is-mobile .app-grid-col {
  flex: var(--mobile-flex);
  width: var(--mobile-width);
}
</style>
