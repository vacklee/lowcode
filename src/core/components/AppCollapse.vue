<script lang="ts" setup>
import { ref } from 'vue'
import { AppTab } from './AppTabs.vue'

const props = withDefaults(
  defineProps<{
    tabs: AppTab[]
    modelValue?: string[]
  }>(),
  {
    tabs: () => [],
    modelValue: () => []
  }
)

const emits = defineEmits(['update:modelValue'])
const activeNames = ref(
  props.modelValue.length ? props.modelValue : props.tabs.map(item => item.id)
)
</script>

<template>
  <el-collapse :class="$style.collapse" v-model="activeNames">
    <el-collapse-item
      v-for="item in tabs"
      :key="item.id"
      :name="item.id"
      :title="item.title"
    >
      <component
        v-if="item.component"
        :is="item.component"
        v-bind="item.componentProps"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" module>
@import 'core/styles/collapse.scss';
</style>
