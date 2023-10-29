<script lang="ts" setup>
import { borderTypes } from '@/core/config/select'
import AppCauselRadio from '../../AppCauselRadio.vue'
import { Border, BorderType, FourDirect } from '@/core/config/styles'
import { computed, ref } from 'vue'
import ColorInput from './ColorInput.vue'
import { toRGBColor } from '@/core/utils/color'
import FixedPixelInput from './FixedPixelInput.vue'
import AppIcon from '../../AppIcon.vue'
import AppIconBtn from '../../AppControls/AppIconBtn.vue'
import AppFourDirectPixel from '../../AppFourDirectPixel.vue'

const props = defineProps<{
  modelValue?: Border
}>()

const emits = defineEmits(['update:modelValue', 'other-show', 'other-hide'])

// 设置值
const setValue = <K extends keyof Border>(key: K, val?: Border[K]) => {
  const obj = {
    type: props.modelValue?.type,
    width: props.modelValue?.width,
    color: props.modelValue?.color,
    [key]: val
  }

  if (Object.values(obj).every(item => item === void 0)) {
    emits('update:modelValue', void 0)
    return
  }

  emits('update:modelValue', obj)
}

// 边框类型
const borderType = computed({
  get: () => props.modelValue?.type || BorderType.DEFAULT,
  set: val => setValue('type', val)
})

// 边框颜色
const borderColor = computed({
  get: () => toRGBColor(props.modelValue?.color),
  set: val => setValue('color', val)
})

const checkBorderWidthAllEqual = (
  val?: FourDirect
): val is Required<FourDirect> => {
  if (!val) return true
  const { top, left, right, bottom } = val
  return top === left && left === right && right === bottom
}

const borderWidthIsCustom = ref(
  props.modelValue?.width
    ? !checkBorderWidthAllEqual(props.modelValue.width)
    : false
)

// 边框粗细
const borderWidth = computed({
  get: () => {
    if (!props.modelValue?.width) return ''
    if (borderWidthIsCustom.value) return ''
    if (!checkBorderWidthAllEqual(props.modelValue.width)) return ''
    return props.modelValue.width.top
  },
  set: val =>
    setValue(
      'width',
      val
        ? {
            top: val,
            left: val,
            right: val,
            bottom: val
          }
        : void 0
    )
})

// 四方向边框粗细
const borderWidthFourDirect = computed({
  get: () => props.modelValue?.width,
  set: val => setValue('width', val)
})

const borderWidthPlaceholder = computed(() => {
  if (borderWidthIsCustom.value) return '自定义'
  if (!props.modelValue?.width) return ''
  return borderWidth.value ? '' : '自定义'
})

const showAddon = computed(() =>
  [BorderType.DASHED, BorderType.SOLID].includes(borderType.value)
)
</script>

<template>
  <div :class="$style.box">
    <AppCauselRadio
      :options="borderTypes"
      :click-cancel="false"
      v-model="borderType"
    />

    <template v-if="showAddon">
      <div :class="$style.box_row">
        <!-- 颜色 -->
        <div :class="$style.box_color">
          <ColorInput
            v-model="borderColor"
            @picker-focus="emits('other-show')"
            @picker-blur="emits('other-hide')"
          />
        </div>

        <!-- 粗细 -->
        <div :class="$style.box_width">
          <FixedPixelInput
            v-model="borderWidth"
            title="边框粗细"
            :placeholder="borderWidthPlaceholder"
            :disabled="borderWidthIsCustom"
          >
            <AppIcon icon="t-icon-style-border-width" />
          </FixedPixelInput>
        </div>

        <!-- 自定义 -->
        <AppIconBtn
          icon="t-icon-style-border-all"
          :size="32"
          :click-cancel="true"
          v-model:active="borderWidthIsCustom"
        />
      </div>

      <AppFourDirectPixel
        v-model="borderWidthFourDirect"
        :options="{
          top: { title: '顶部边框', icon: 't-icon-style-border-top' },
          left: { title: '左边框', icon: 't-icon-style-border-left' },
          right: { title: '右边框', icon: 't-icon-style-border-right' },
          bottom: { title: '底部边框', icon: 't-icon-style-border-bottom' }
        }"
        v-if="borderWidthIsCustom"
      />
    </template>
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-small;
  display: flex;
  flex-direction: column;
  gap: $spacing-small;

  &_row {
    display: flex;
    align-items: center;
    gap: $spacing-mini;
  }

  &_color,
  &_width {
    flex: 1;
    width: 0;
  }
}
</style>
