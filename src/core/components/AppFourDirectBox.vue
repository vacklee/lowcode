<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { FourDirect } from '../config/styles'
import { isPixel, parsePixel } from '../utils/unit'

const props = defineProps<{
  modelValue?: FourDirect
  leftTitle?: string
  rightTitle?: string
}>()

const slots = useSlots()
const emits = defineEmits(['update:modelValue'])

const getValue = (key: keyof FourDirect) => {
  const val = props.modelValue?.[key]
  if (isPixel(val)) {
    return val
  }
  return void 0
}

const useValue = (key: keyof FourDirect) =>
  computed({
    get: () => {
      if (!isPixel(props.modelValue?.[key])) {
        return ''
      }

      const val = parsePixel(props.modelValue?.[key])
      if (val.unit === 'px') {
        return `${val.value}`
      }
      return `${val.value}${val.unit}`
    },
    set: val => {
      const obj: FourDirect = {
        top: getValue('top'),
        left: getValue('left'),
        right: getValue('right'),
        bottom: getValue('bottom')
      }

      if (/^-?\d+(\.\d+)?$/.test(val)) {
        obj[key] = `${val}px`
      } else if (/^-?\d+\.$/.test(val)) {
        obj[key] = `${val.replace('.', '')}px`
      } else if (!val) {
        obj[key] = ''
      }

      if (Object.values(obj).every(item => item === void 0)) {
        emits('update:modelValue', void 0)
        return
      }

      emits('update:modelValue', obj)
    }
  })

const topValue = useValue('top')
const leftValue = useValue('left')
const rightValue = useValue('right')
const bottomValue = useValue('bottom')
</script>

<template>
  <div :class="$style.box">
    <slot v-if="slots.default" />
    <div :class="$style.box_border" v-else></div>

    <span :class="[$style.box_title, $style.left]">{{ leftTitle }}</span>
    <span :class="[$style.box_title, $style.right]">{{ rightTitle }}</span>

    <input
      :class="[$style.box_input, $style.top]"
      type="text"
      placeholder="0"
      v-model="topValue"
    />
    <input
      :class="[$style.box_input, $style.left]"
      type="text"
      placeholder="0"
      v-model="leftValue"
    />
    <input
      :class="[$style.box_input, $style.right]"
      type="text"
      placeholder="0"
      v-model="rightValue"
    />
    <input
      :class="[$style.box_input, $style.bottom]"
      type="text"
      placeholder="0"
      v-model="bottomValue"
    />
  </div>
</template>

<style lang="scss" module>
.box {
  padding: 26px;
  background: #f1f2f5;
  border-radius: $border-radius-base;
  position: relative;

  &_border {
    height: 36px;
    border: 1px dashed #97a3b7;
    background: #fff;
  }

  &_input {
    width: 26px;
    height: 26px;
    position: absolute;
    border: none;
    outline: none;
    margin: 0;
    padding: 0;
    text-align: center;
    color: $text-color-base;
    font-size: $font-size-base;
    background: transparent;

    &::placeholder {
      color: #97a3b7;
    }

    &.top {
      top: 0px;
      left: calc(50% - 13px);
    }

    &.left {
      top: calc(50% - 13px);
      left: 0px;
    }

    &.right {
      top: calc(50% - 13px);
      right: 0px;
    }

    &.bottom {
      left: calc(50% - 13px);
      bottom: 0px;
    }
  }

  &_title {
    top: 3px;
    line-height: 20px;
    color: #97a3b7;
    position: absolute;
    &.left {
      left: 8px;
    }
    &.right {
      right: 8px;
    }
  }
}
</style>
