<script lang="ts" setup>
import { computed, ref } from 'vue'
import AppPoppover from './AppPoppover.vue'
import { PropsOf } from '../hooks/use-dialog'

defineProps<{
  placement?: string
  popperProps?: PropsOf<typeof AppPoppover>
}>()

const poppoverRef = ref<InstanceType<typeof AppPoppover>>(null!)
const isFocus = computed(() => !!poppoverRef.value?.popoverVisible)

defineExpose({
  poppoverRef
})
</script>

<template>
  <AppPoppover
    ref="poppoverRef"
    :placement="placement"
    :show-arrow="false"
    v-bind="popperProps"
  >
    <template #reference>
      <div :class="[$style.control, isFocus && $style.is_focus]">
        <div :class="$style.control_prefix">
          <slot name="prefix" />
        </div>
        <div :class="$style.control_content">
          <slot />
        </div>
      </div>
    </template>

    <template #default>
      <slot name="poppover" />
    </template>
  </AppPoppover>
</template>

<style lang="scss" module>
.control {
  height: 32px;
  background: #f1f2f5;
  border-radius: $border-radius-base;
  display: flex;
  align-items: center;
  padding: 0 4px;
  cursor: pointer;

  &_prefix {
    width: 24px;
    height: 24px;
    margin-right: $spacing-mini;
    border-radius: $border-radius-base;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &_content {
    flex: 1;
    width: 0;
    font-size: $font-size-base;
    color: $text-color-dark;
    @include text-cut();
  }

  &.is_focus {
    box-shadow: 0 0 0 1px $color-primary inset;
  }
}
</style>
