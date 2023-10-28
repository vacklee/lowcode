<script lang="ts" setup>
import { computed, ref } from 'vue'
import { toRGBColor } from 'core/utils/color'

const props = defineProps<{
  modelValue?: string
}>()

const emits = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue ?? '',
  set: val => emits('update:modelValue', val)
})

const colorValue = computed({
  get: () => toRGBColor(props.modelValue),
  set: val => emits('update:modelValue', val)
})
</script>

<template>
  <div :class="$style.box">
    <el-tooltip
      content="色值"
      :show-after="1000"
      :trigger-keys="[]"
      placement="bottom"
    >
      <el-input type="text" v-model="inputValue">
        <template #prepend>
          <el-color-picker
            :show-alpha="true"
            color-format="rgb"
            v-model="colorValue"
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
