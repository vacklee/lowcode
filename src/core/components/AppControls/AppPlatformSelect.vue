<script lang="ts" setup>
import { AppPlatform } from 'core/data/app'
import AppIconBtn from './AppIconBtn.vue'
import { computed } from 'vue'

const props = defineProps<{
  modelValue?: AppPlatform
}>()

const btns = [
  {
    id: AppPlatform.H5,
    title: 'H5',
    icon: 't-icon-phone'
  },
  {
    id: AppPlatform.MINI,
    title: '小程序',
    icon: 't-icon-miniprogram'
  },
  {
    id: AppPlatform.PC,
    title: 'PC',
    icon: 't-icon-pc'
  }
]

const emits = defineEmits(['update:modelValue'])
const innerSelected = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val)
})
</script>

<template>
  <div :class="$style.box">
    <AppIconBtn
      v-for="item in btns"
      :key="item.id"
      :icon="item.icon"
      :title="item.title"
      :active="innerSelected === item.id"
      @click="innerSelected = item.id"
    />
  </div>
</template>

<style lang="scss" module>
.box {
  display: inline-flex;
  align-items: center;
  gap: $spacing-mini;
}
</style>
