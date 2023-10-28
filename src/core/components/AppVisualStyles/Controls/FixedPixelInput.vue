<script lang="ts" setup>
import { computed } from 'vue'
import PixelInput from 'core/components/AutoForm/Controls/PixelInput.vue'

const props = defineProps<{
  modelValue?: string
  title: string
}>()

const emits = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue,
  set: val => {
    emits('update:modelValue', val)
  }
})
</script>

<template>
  <div>
    <el-tooltip :content="title" :show-after="1000" placement="bottom">
      <PixelInput
        size="default"
        :allow-empty="true"
        fixed-unit="px"
        :placeholder="title"
        v-model="innerValue"
      >
        <template #prefix>
          <slot />
        </template>
      </PixelInput>
    </el-tooltip>
  </div>
</template>
