<script lang="ts" setup>
import { computed } from 'vue'
import PixelInput from 'core/components/AutoForm/Controls/PixelInput.vue'

const props = defineProps<{
  modelValue?: string
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
  <div :class="$style.box">
    <el-tooltip content="字号" :show-after="1000" placement="bottom">
      <PixelInput
        size="default"
        :allow-empty="true"
        fixed-unit="px"
        placeholder="字号"
        v-model="innerValue"
      >
        <template #prefix>
          <span>A</span>
        </template>
      </PixelInput>
    </el-tooltip>
  </div>
</template>

<style lang="scss" module>
.box {
  grid-area: font-size;
}
</style>
