<script lang="ts" setup></script>

<template>
  <div :class="$style.empty">
    <div :class="$style.empty_wrap">
      <img :class="$style.empty_img" src="@/assets/empty.svg" />
      <div>从右侧面板拖入组件或区块</div>
    </div>
  </div>
</template>

<style lang="scss" module>
.empty {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  background: #fff;
  font-size: $font-size-base;

  &_wrap {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    max-width: 285px;
    margin: 0 auto;
    padding: $spacing-mini;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $text-color-gray;
  }

  &_img {
    width: 79%;
    margin-bottom: $spacing-base;
  }
}
</style>
