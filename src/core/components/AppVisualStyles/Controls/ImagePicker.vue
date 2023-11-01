<script lang="ts" setup>
import { computed } from 'vue'
import AppIcon from '../../AppIcon.vue'

const props = defineProps<{
  modelValue?: string
}>()

const emits = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})
</script>

<template>
  <div :class="$style.box">
    <div :class="$style.box_picker">
      <div :class="$style.box_picker_mask">
        <AppIcon icon="t-icon-img-l" :size="24" />
        <div :class="$style.box_picker_text">点击选择图像</div>
      </div>

      <div :class="$style.box_picker_img" v-if="innerValue">
        <img :src="innerValue" />
      </div>
    </div>

    <el-input
      placeholder="输入图片url"
      :clearable="true"
      v-model="innerValue"
    />
  </div>
</template>

<style lang="scss" module>
.box {
  display: flex;
  flex-direction: column;
  gap: $spacing-mini;

  &_picker {
    width: 100%;
    padding-bottom: 50%;
    position: relative;

    &_mask,
    &_img {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f1f2f5;
      border-radius: $border-radius-base;
      position: absolute;
      color: $text-color-gray;
      cursor: pointer;
    }

    &_text {
      margin-top: $spacing-mini;
    }

    &_img {
      padding: $spacing-mini;
      box-sizing: border-box;
      & > img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    &:hover > &_img {
      display: none;
    }
  }
}
</style>
