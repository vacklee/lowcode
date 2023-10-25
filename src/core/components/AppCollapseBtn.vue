<script lang="ts" setup>
import { computed } from 'vue'
import { ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    direct?: 'left' | 'right'
    modelValue?: boolean
    openText?: string
    closeText?: string
  }>(),
  {
    direct: 'right',
    modelValue: false,
    openText: '打开',
    closeText: '收起'
  }
)

const emits = defineEmits(['update:modelValue'])
const collapse = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})

const Arrow = computed(() => {
  if (props.direct === 'left') {
    return collapse.value ? ArrowLeftBold : ArrowRightBold
  }
  return collapse.value ? ArrowRightBold : ArrowLeftBold
})

const tooltipPlacement = computed(() => {
  if (props.direct === 'left') {
    return 'right'
  }
  return 'left'
})

const toggle = () => {
  collapse.value = !collapse.value
}
</script>

<template>
  <div :class="[$style.btn, $style[direct]]">
    <el-tooltip
      :content="collapse ? closeText : openText"
      :placement="tooltipPlacement"
      :show-after="1000"
    >
      <div :class="$style.btn_trigger" @click="toggle">
        <el-icon :size="10">
          <Arrow />
        </el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<style lang="scss" module>
.btn {
  top: 0;
  width: 15px;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;

  &.left {
    right: 0;
    transform: translateX(100%);
  }

  &.right {
    left: 0;
    transform: translateX(-100%);
  }

  &_trigger {
    --bg: #bcc4d0;
    width: 15px;
    height: 35px;
    background-color: var(--bg);
    position: relative;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    opacity: 0;

    &:hover {
      --bg: #95a3b8;
    }

    &::before,
    &::after {
      content: '';
      left: 0;
      width: 15px;
      height: 18px;
      background-color: var(--bg);
      position: absolute;
      transition: all 0.15s;
    }

    &::before {
      top: -10px;
      .left > & {
        border-top-right-radius: $border-radius-base;
        transform: skewY(-311deg);
      }

      .right > & {
        border-top-left-radius: $border-radius-base;
        transform: skewY(-229deg);
      }
    }

    &::after {
      bottom: -10px;
      .left > & {
        border-bottom-right-radius: $border-radius-base;
        transform: skewY(-49deg);
      }
      .right > & {
        border-bottom-left-radius: $border-radius-base;
        transform: skewY(-131deg);
      }
    }
  }

  &:hover > &_trigger {
    opacity: 1;
  }
}
</style>
