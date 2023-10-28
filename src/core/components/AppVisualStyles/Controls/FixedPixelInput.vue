<script lang="ts" setup>
import { computed } from 'vue'
import PixelInput from 'core/components/AutoForm/Controls/PixelInput.vue'
import { Unit } from '@/core/utils/unit'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    title: string
    hidePlaceholder?: boolean
    fixedUnit?: Unit | 'none'
  }>(),
  {
    fixedUnit: 'px'
  }
)

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
        :fixed-unit="fixedUnit === 'none' ? void 0 : fixedUnit"
        :placeholder="hidePlaceholder ? '' : title"
        v-model="innerValue"
        :class="$style.input"
      >
        <template #prefix>
          <slot />
        </template>
      </PixelInput>
    </el-tooltip>
  </div>
</template>

<style lang="scss" module>
.input {
  & :global(.el-select) {
    width: 50px !important;

    & :global(.el-input__wrapper) {
      padding: 0 $spacing-mini !important;
    }

    &:global(.el-select--default) :global(.el-input__wrapper) {
      height: 34px;
    }

    & :global(.el-select__icon) {
      margin: 0 !important;
    }
  }

  & :global(.el-input-group__append) {
    box-shadow: none !important;
  }
}
</style>
