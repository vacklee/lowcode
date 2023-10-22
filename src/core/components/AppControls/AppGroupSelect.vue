<script lang="ts" setup>
import { computed } from 'vue'
import { useAppData } from 'core/hooks/use-app-data'

const props = withDefaults(
  defineProps<{
    modelValue?: string
  }>(),
  {
    modelValue: ''
  }
)

const emits = defineEmits(['update:modelValue'])

const { appData } = useAppData()
const options = computed(() =>
  appData.value.pageGroups.map(item => ({
    value: item.id,
    label: item.title
  }))
)

const innerValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})
</script>

<template>
  <el-select
    placeholder=" "
    style="width: 100%"
    v-model="innerValue"
    :clearable="true"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    />
  </el-select>
</template>
