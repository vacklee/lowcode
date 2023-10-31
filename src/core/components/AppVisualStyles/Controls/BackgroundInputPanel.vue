<script lang="ts" setup>
import {
  Background,
  BackgroundType,
  ColorBackground,
  ImageBackground
} from '@/core/config/styles'
import { computed } from 'vue'
import AppCauselRadio from '../../AppCauselRadio.vue'
import { backgroundTypes } from '@/core/config/select'
import ColorInput from './ColorInput.vue'

type SetValueOptions<T extends BackgroundType> = T extends BackgroundType.COLOR
  ? Partial<ColorBackground>
  : T extends BackgroundType.IMAGE
  ? Partial<ImageBackground>
  : never

const props = defineProps<{
  modelValue?: Background
}>()

const emits = defineEmits(['update:modelValue', 'other-show', 'other-hide'])
const setValue = <T extends BackgroundType>(
  type: T,
  opts?: SetValueOptions<T>
) => {
  if (type === BackgroundType.DEFAULT || type === BackgroundType.NONE) {
    emits('update:modelValue', type)
    return
  }

  const obj = {
    type,
    ...(opts || {})
  }

  if (typeof props.modelValue === 'object' && props.modelValue.type === type) {
    emits('update:modelValue', {
      ...props.modelValue,
      ...obj
    })
    return
  }

  emits('update:modelValue', obj)
}

// 背景类型
const backgroundType = computed({
  get: () =>
    (typeof props.modelValue === 'object'
      ? props.modelValue.type
      : props.modelValue) || BackgroundType.DEFAULT,
  set: type => setValue(type)
})

/** 颜色背景 */
const isColorBackground = computed(
  () => backgroundType.value === BackgroundType.COLOR
)
const colorValue = computed({
  get: () => {
    if (isColorBackground.value) {
      return (props.modelValue as ColorBackground).color || ''
    }
    return ''
  },
  set: color => setValue(BackgroundType.COLOR, { color })
})
</script>

<template>
  <div :class="$style.box">
    <AppCauselRadio
      :options="backgroundTypes"
      :click-cancel="false"
      v-model="backgroundType"
    />

    <ColorInput
      v-model="colorValue"
      @picker-focus="emits('other-show')"
      @picker-blur="emits('other-hide')"
      v-if="isColorBackground"
    />
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-small;
  display: flex;
  flex-direction: column;
  gap: $spacing-small;
}
</style>
