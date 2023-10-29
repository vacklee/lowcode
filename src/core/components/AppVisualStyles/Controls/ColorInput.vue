<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useAppData } from 'core/hooks/use-app-data'
import { toRGBColor, isColor } from 'core/utils/color'

const props = defineProps<{
  modelValue?: string
}>()

const { getCommonUseColors, setCommonUseColors } = useAppData()
const emits = defineEmits(['update:modelValue', 'picker-focus', 'picker-blur'])

const inputValue = computed({
  get: () => props.modelValue ?? '',
  set: val => emits('update:modelValue', val)
})

const colorValue = computed({
  get: () => toRGBColor(props.modelValue),
  set: val => emits('update:modelValue', val)
})

// 预设颜色
const predefine = computed(() => getCommonUseColors())

watch(
  () => props.modelValue,
  color => {
    if (isColor(color)) {
      setCommonUseColors(color)
    }
  }
)
</script>

<template>
  <div :class="$style.box">
    <el-tooltip
      :content="inputValue || '选择颜色'"
      :show-after="1000"
      :trigger-keys="[]"
      placement="bottom"
    >
      <el-input placeholder="#色值" type="text" v-model="inputValue">
        <template #prepend>
          <el-color-picker
            :show-alpha="true"
            :predefine="predefine"
            color-format="rgb"
            v-model="colorValue"
            @focus="emits('picker-focus')"
            @blur="emits('picker-blur')"
          />
        </template>
      </el-input>
    </el-tooltip>
  </div>
</template>

<style lang="scss" module>
.box {
  grid-area: color;

  & :global(.el-input-group__prepend) {
    padding: 0;

    & :global(.el-color-picker__trigger) {
      border: none;
    }
  }
}
</style>
