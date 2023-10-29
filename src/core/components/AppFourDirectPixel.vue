<script lang="ts">
type Option = {
  title: string
  placeholder?: string
  icon?: string
  span?: string
}

type Options = {
  top: Option
  left: Option
  right: Option
  bottom: Option
}

export type { Options }
</script>

<script lang="ts" setup>
import { FourDirect } from '../config/styles'
import AppIcon from './AppIcon.vue'
import FixedPixelInput from './AppVisualStyles/Controls/FixedPixelInput.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: FourDirect
    options: Options
    layout?: Array<keyof FourDirect>
  }>(),
  {
    layout: () => ['top', 'bottom', 'left', 'right']
  }
)

const emits = defineEmits(['update:modelValue'])
const getValue = (key: keyof FourDirect) => props.modelValue?.[key]
const setValue = (key: keyof FourDirect, value?: string) => {
  const obj = {
    top: getValue('top'),
    left: getValue('left'),
    right: getValue('right'),
    bottom: getValue('bottom'),
    [key]: value
  }

  if (Object.values(obj).every(item => !item)) {
    emits('update:modelValue', void 0)
    return
  }

  emits('update:modelValue', obj)
}

const _ = (s: unknown) => s as string
</script>

<template>
  <div :class="$style.box">
    <FixedPixelInput
      v-for="item in layout"
      :key="item"
      :title="options[item].title"
      :placeholder="options[item].placeholder"
      :model-value="getValue(item)"
      @update:model-value="setValue(item, $event)"
    >
      <AppIcon :icon="_(options[item].icon)" v-if="options[item].icon" />
      <span v-else-if="options[item].span">{{ options[item].span }}</span>
    </FixedPixelInput>
  </div>
</template>

<style lang="scss" module>
.box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-mini;
}
</style>
