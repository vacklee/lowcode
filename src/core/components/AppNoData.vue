<script lang="ts" setup>
defineProps<{
  text: string
}>()
</script>

<template>
  <div :class="$style.box">
    <img :class="$style.box_img" src="@/assets/no-data.png" />
    <div :class="$style.box_text">{{ text }}</div>
  </div>
</template>

<style lang="scss" module>
.box {
  max-width: 400px;
  margin: 0 auto;
  padding: 120px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &_text {
    margin-top: $spacing-medium;
    color: $text-color-gray;
  }

  &_img {
    max-width: 120px;
    width: 100%;
  }
}
</style>
