<script lang="ts" setup>
import { imagePositionOptions } from '@/core/config/select'
import AppIconBtn from '../../AppControls/AppIconBtn.vue'
import { CoordDirect } from '@/core/config/styles'
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: CoordDirect
}>()

const emits = defineEmits(['update:modelValue'])

/** 九宫格值 */
const iconBtnValue = computed<string>({
  get: () => {
    if (!props.modelValue) {
      return ''
    }
    const { x = 'auto', y = '' } = props.modelValue
    return `${x} ${y}`
  },
  set: val => {
    if (!val) {
      emits('update:modelValue', void 0)
      return
    }
    const [x, y] = val.split(' ')
    emits('update:modelValue', { x, y })
  }
})

/** 九宫格选中 */
const onClickIconBtn = (val: string) => {
  if (val === iconBtnValue.value) {
    iconBtnValue.value = ''
  } else {
    iconBtnValue.value = val
  }
}

const setValue = (key: 'x' | 'y', val: string) => {
  const coord = {
    x: props.modelValue?.x || '',
    y: props.modelValue?.y || '',
    [key]: val
  }

  if (Object.values(coord).some(Boolean)) {
    emits('update:modelValue', coord)
  } else {
    emits('update:modelValue', void 0)
  }
}

/** 左 */
const leftValue = computed({
  get: () => props.modelValue?.x || '',
  set: val => setValue('x', val)
})
/** 顶 */
const topValue = computed({
  get: () => props.modelValue?.y || '',
  set: val => setValue('y', val)
})
</script>

<template>
  <div :class="$style.box">
    <!-- 九宫格 -->
    <div :class="$style.box_grid">
      <AppIconBtn
        v-for="item in imagePositionOptions"
        :key="item.value"
        :icon="item.icon"
        :size="32"
        :title="item.label"
        :active="iconBtnValue === item.value"
        @click="onClickIconBtn(item.value)"
      />
    </div>

    <!-- 输入框 -->
    <div :class="$style.box_inputs">
      <el-input placeholder="auto" v-model="leftValue">
        <template #prefix>
          <span>左</span>
        </template>
      </el-input>

      <el-input placeholder="" v-model="topValue">
        <template #prefix>
          <span>顶</span>
        </template>
      </el-input>
    </div>
  </div>
</template>

<style lang="scss" module>
.box {
  display: flex;
  align-items: center;
  gap: $spacing-medium;

  &_grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
  }

  &_inputs {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-mini;
  }
}
</style>
