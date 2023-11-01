<script lang="ts" setup>
import {
  Background,
  BackgroundType,
  ColorBackground,
  ImageBackground
} from '@/core/config/styles'
import { computed } from 'vue'
import AppCauselRadio from '../../AppCauselRadio.vue'
import { backgroundTypes, backgroundSizeOptions } from '@/core/config/select'
import ColorInput from './ColorInput.vue'
import ImagePicker from './ImagePicker.vue'
import CommonSelect from '../../AutoForm/Controls/CommonSelect.vue'
import AppIcon from '../../AppIcon.vue'
import ImagePositionPicker from './ImagePositionPicker.vue'

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

/** 图片背景 */
const isImageBackground = computed(
  () => backgroundType.value === BackgroundType.IMAGE
)

// 图片路径
const imageURL = computed({
  get: () => {
    if (!isImageBackground.value) {
      return ''
    }
    return (props.modelValue as ImageBackground).url || ''
  },
  set: url => setValue(BackgroundType.IMAGE, { url })
})

// 背景尺寸
const backgroundSize = computed({
  get: () => {
    if (!isImageBackground.value) {
      return ''
    }

    const { size } = props.modelValue as ImageBackground
    if (!size) return ''

    const { x = 'auto', y = 'auto' } = size
    if (x === 'auto' && y === 'auto') {
      return 'auto'
    }

    return `${x} ${y}`
  },
  set: val => {
    if (!val) {
      setValue(BackgroundType.IMAGE, { size: void 0 })
      return
    }
    const [x = 'auto', y = 'auto'] = val.split(' ')
    setValue(BackgroundType.IMAGE, { size: { x, y } })
  }
})

/** 图片位置 */
const imagePosition = computed({
  get: () => {
    if (!isImageBackground.value) {
      return void 0
    }
    return (props.modelValue as ImageBackground).position
  },
  set: position => setValue(BackgroundType.IMAGE, { position })
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

    <div :class="$style.flex" v-else-if="isImageBackground">
      <!-- 图片路径 -->
      <ImagePicker
        v-model="imageURL"
        @dialog-open="emits('other-show')"
        @dialog-closed="emits('other-hide')"
      />

      <!-- 背景尺寸 -->
      <CommonSelect
        placeholder="背景尺寸"
        :options="backgroundSizeOptions"
        :clearable="true"
        v-model="backgroundSize"
        @popper-show="emits('other-show')"
        @popper-hide="emits('other-hide')"
      >
        <template #prefix>
          <AppIcon icon="t-icon-style-img-cover" />
        </template>
      </CommonSelect>

      <!-- 图片位置 -->
      <span>图片位置</span>
      <ImagePositionPicker v-model="imagePosition" />
    </div>
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-small;
  display: flex;
  flex-direction: column;
  gap: $spacing-small;
}

.flex {
  display: flex;
  flex-direction: column;
  gap: $spacing-small;
}
</style>
