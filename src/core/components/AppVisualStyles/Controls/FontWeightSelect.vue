<script lang="ts" setup>
import { FontWeight } from '@/core/config/styles'
import { fontWeightOptions } from '@/core/config/select'
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: FontWeight
}>()

const emits = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})
</script>

<template>
  <div :class="$style.box">
    <el-tooltip content="字重" :show-after="1000" placement="bottom">
      <el-select placeholder="字重" v-model="innerValue" :clearable="true">
        <template #prefix>
          <span>B</span>
        </template>

        <el-option
          v-for="item in fontWeightOptions"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </el-tooltip>
  </div>
</template>

<style lang="scss" module>
.box {
  grid-area: font-weight;
}
</style>
