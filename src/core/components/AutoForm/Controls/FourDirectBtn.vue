<script lang="ts" setup>
defineProps<{
  topText: string
  leftText: string
  rightText: string
  bottomText: string
  modelValue?: unknown
}>()

const emits = defineEmits(['update:modelValue'])
const onClick = (direct: string) => emits('update:modelValue', direct)
</script>

<template>
  <div :class="$style.box">
    <div :class="$style.box_top">
      <el-button size="small" @click="onClick('top')">{{ topText }}</el-button>
    </div>
    <div :class="$style.box_center">
      <el-button size="small" @click="onClick('left')">{{
        leftText
      }}</el-button>
      <div :class="$style.box_vacant"></div>
      <el-button size="small" @click="onClick('right')">{{
        rightText
      }}</el-button>
    </div>
    <div :class="$style.box_bottom">
      <el-button size="small" @click="onClick('bottom')">{{
        bottomText
      }}</el-button>
    </div>
  </div>
</template>

<style lang="scss" module>
.box {
  width: 100%;
  &_top,
  &_center,
  &_bottom {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &_vacant {
    flex: 1;
    margin: $spacing-mini;

    &::before {
      content: '';
      width: 76px;
      height: 32px;
      background: #eff0f3;
      border: 1px dashed $border-color-dark;
      display: block;
    }
  }
}
</style>
