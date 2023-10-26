<script lang="ts" setup>
import {
  CellWidth,
  CellWidthEnum,
  isPixel as _isPixel
} from '@/core/utils/unit'
import { computed, ref } from 'vue'
import SpanInput from './SpanInput.vue'
import PixelInput from './PixelInput.vue'

const props = defineProps<{
  modelValue?: CellWidth
}>()

const emits = defineEmits(['update:modelValue'])
const spanDefault = ref(3)
const pixelDefault = ref('100px')

enum itemsKey {
  auto = 'auto',
  autoFill = 'autoFill',
  custom = 'custom'
}

const items = [
  { value: itemsKey.autoFill, label: '自动填充' },
  { value: itemsKey.auto, label: '适应内容' },
  { value: itemsKey.custom, label: '手动调节' }
]

const activeItemKey = computed({
  get: () => {
    if (props.modelValue === CellWidthEnum.FILL) {
      return itemsKey.autoFill
    }
    if (props.modelValue === CellWidthEnum.AUTO) {
      return itemsKey.auto
    }
    return itemsKey.custom
  },
  set: value => {
    if (value === itemsKey.auto) {
      emits('update:modelValue', CellWidthEnum.AUTO)
      return
    }
    if (value === itemsKey.autoFill) {
      emits('update:modelValue', CellWidthEnum.FILL)
      return
    }
    emits('update:modelValue', spanDefault.value)
  }
})

const setActiveItemKey = (key: itemsKey) => {
  if (key !== activeItemKey.value) {
    activeItemKey.value = key
  }
}

// 是否按12列调节
const is12Span = computed({
  get: () => typeof props.modelValue === 'number',
  set: val => {
    if (val) {
      emits('update:modelValue', spanDefault.value)
    }
  }
})

// 是否按像素调节
const isPixel = computed({
  get: () => _isPixel(props.modelValue),
  set: val => {
    if (val) {
      emits('update:modelValue', pixelDefault.value)
    }
  }
})

const spanNumber = computed<number>({
  get: () => props.modelValue as unknown as number,
  set: val => {
    spanDefault.value = val
    emits('update:modelValue', val)
  }
})

const pixelValue = computed<string>({
  get: () => props.modelValue as unknown as string,
  set: val => {
    console.log({ val })
    pixelDefault.value = val
    emits('update:modelValue', val)
  }
})
</script>

<template>
  <div :class="$style.box">
    <div :class="$style.causel">
      <div
        :class="[
          $style.causel_item,
          {
            [$style.active]: activeItemKey === item.value
          }
        ]"
        v-for="item in items"
        :key="item.value"
        @click="setActiveItemKey(item.value)"
      >
        {{ item.label }}
      </div>
    </div>

    <template v-if="activeItemKey === itemsKey.custom">
      <div :class="$style.box_custom">
        <div>
          <el-radio size="small" :label="true" v-model="is12Span">
            按12列调节
          </el-radio>

          <SpanInput v-model="spanNumber" v-if="is12Span" />
        </div>

        <div>
          <el-radio size="small" :label="true" v-model="isPixel">
            输入像素精确调节
          </el-radio>

          <PixelInput v-model="pixelValue" v-if="isPixel" />
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" module>
.box {
  width: 100%;
  font-size: $font-size-base;
  line-height: 1.2;

  &_custom {
    margin-top: $spacing-mini;
  }
}

.causel {
  height: 32px;
  background: #e3e6eb;
  border-radius: $border-radius-base;
  display: flex;
  box-sizing: border-box;
  padding: calc($spacing-mini / 2);
  gap: calc($spacing-mini / 2);

  &_wrap {
    padding: $spacing-mini $spacing-small;
  }

  &_item {
    flex: 1;
    width: 0;
    height: 100%;
    border-radius: $border-radius-base;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.active {
      background: #fff;
    }
  }
}
</style>
