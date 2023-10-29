<script lang="ts" setup>
import { computed, ref } from 'vue'
import { debounce } from 'lodash'
import { Placement } from 'element-plus'

withDefaults(
  defineProps<{
    popperWidth?: number | string
    maxContentHeight?: number | string
    placement?: Placement
    showArrow?: boolean
  }>(),
  {
    popperWidth: 320,
    maxContentHeight: 630,
    placement: 'bottom-start',
    showArrow: true
  }
)

const emits = defineEmits(['visible-change'])

const _popoverVisible = ref(false)

/**
 * _popoverVisibleStop 为 true 时表示在 popover 弹层中点击了插入在 body 层的按钮
 * 此时应该阻止弹层隐藏
 */
const _popoverVisibleStop = ref(false)

const popoverVisible = computed({
  get: () => _popoverVisible.value,
  set: val => {
    if (_popoverVisibleStop.value) {
      return
    }
    _popoverVisible.value = val
    emits('visible-change', val)
  }
})

const popoverVisibleStopPause = () => {
  _popoverVisibleStop.value = true
}
const popoverVisibleStopResume = debounce(() => {
  _popoverVisibleStop.value = false
}, 500)

defineExpose({
  popoverVisible,
  popoverVisibleStopPause,
  popoverVisibleStopResume
})
</script>

<template>
  <el-popover
    trigger="click"
    :placement="placement"
    :width="popperWidth"
    :popper-class="$style.popper"
    :show-arrow="showArrow"
    v-model:visible="popoverVisible"
  >
    <template #reference>
      <slot name="reference" />
    </template>

    <el-scrollbar :max-height="maxContentHeight">
      <slot />
    </el-scrollbar>
  </el-popover>
</template>

<style lang="scss" module>
.popper {
  padding: 0 !important;
}
</style>
