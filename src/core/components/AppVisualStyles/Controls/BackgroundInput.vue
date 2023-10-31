<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  Background,
  BackgroundType,
  ColorBackground,
  ImageBackground
} from '@/core/config/styles'
import { backgroundTypes } from '@/core/config/select'
import AppPopperIconControl from '../../AppPopperIconControl.vue'
import AppReadonlyColorPicker from '../../AppReadonlyColorPicker.vue'
import BackgroundInputPanel from './BackgroundInputPanel.vue'

const props = defineProps<{
  modelValue?: Background
}>()

/** 背景类型 */
const backgroundType = computed(() => {
  if (typeof props.modelValue === 'object') {
    return props.modelValue.type
  }
  return props.modelValue || BackgroundType.DEFAULT
})

/** 前缀是否使用图片 */
const isImagePrefix = computed(
  () => backgroundType.value === BackgroundType.IMAGE
)

/** 背景颜色 */
const colorValue = computed(() => {
  if (backgroundType.value === BackgroundType.COLOR) {
    return (props.modelValue as ColorBackground).color
  }
  return ''
})

/** 背景图片 */
const imageURL = computed(() => {
  if (isImagePrefix.value) {
    return (props.modelValue as ImageBackground).url
  }
  return ''
})

const controlLabel = computed(() => {
  const node = backgroundTypes.find(
    item => item.value === backgroundType.value
  )!
  return node.detailLabel || node.label
})

const emits = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})

const controlRef = ref<InstanceType<typeof AppPopperIconControl>>(null!)
const onOtherShow = () => {
  controlRef.value.poppoverRef.popoverVisibleStopPause()
}
const onOtherHide = () => {
  controlRef.value.poppoverRef.popoverVisibleStopResume()
}
</script>

<template>
  <AppPopperIconControl
    ref="controlRef"
    placement="left-end"
    :popper-props="{
      popperWidth: 320
    }"
  >
    <template #prefix>
      <div
        :style="`background-image: url(${imageURL})`"
        v-if="isImagePrefix"
      ></div>
      <AppReadonlyColorPicker :color="colorValue" v-else />
    </template>

    <span>{{ controlLabel }}</span>

    <template #poppover>
      <BackgroundInputPanel
        v-model="innerValue"
        @other-show="onOtherShow"
        @other-hide="onOtherHide"
      />
    </template>
  </AppPopperIconControl>
</template>
