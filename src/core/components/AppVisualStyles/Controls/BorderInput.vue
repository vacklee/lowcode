<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Border, BorderType } from '@/core/config/styles'
import AppIcon from '../../AppIcon.vue'
import AppPopperIconControl from '../../AppPopperIconControl.vue'
import AppReadonlyColorPicker from '../../AppReadonlyColorPicker.vue'
import BorderInputPanel from './BorderInputPanel.vue'
import { toRGBColor } from '@/core/utils/color'
import { borderTypes } from '@/core/config/select'

const props = defineProps<{
  modelValue?: Border
}>()

const borderType = computed(() => props.modelValue?.type || BorderType.DEFAULT)
const borderColor = computed(() => toRGBColor(props.modelValue?.color))

const showIconPrefix = computed(() =>
  [BorderType.DEFAULT, BorderType.NONE].includes(borderType.value)
)
const showColorPrefix = computed(() =>
  [BorderType.SOLID, BorderType.DASHED].includes(borderType.value)
)

const controlText = computed(() => {
  const node = borderTypes.find(item => item.value === borderType.value)
  return node ? node.detailLabel || node.label : ''
})

const emits = defineEmits(['update:modelValue'])
const controlRef = ref<InstanceType<typeof AppPopperIconControl>>(null!)

const innerValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})

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
      popperWidth: 280
    }"
  >
    <template #prefix>
      <AppIcon
        icon="t-icon-border-less"
        :size="24"
        style="color: #d6dbe3"
        v-if="showIconPrefix"
      />

      <AppReadonlyColorPicker
        :color="borderColor"
        v-else-if="showColorPrefix"
      />
    </template>

    <span>{{ controlText }}</span>

    <template #poppover>
      <BorderInputPanel
        v-model="innerValue"
        @other-show="onOtherShow"
        @other-hide="onOtherHide"
      />
    </template>
  </AppPopperIconControl>
</template>
