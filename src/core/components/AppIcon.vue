<script lang="ts">
import { type Component } from 'vue'

type IconProp = string | Component

export type { IconProp }
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import AppCIcon from './AppCIcon.vue'

const props = withDefaults(
  defineProps<{
    icon: IconProp
    size?: number
  }>(),
  {
    size: 12
  }
)

const isTIcon = computed(
  () => typeof props.icon === 'string' && /^t\-icon/.test(props.icon)
)

const isElIcon = computed(() => typeof props.icon !== 'string')
</script>

<template>
  <el-icon :size="size">
    <component :is="icon" v-if="isElIcon" />
    <i :class="icon" v-else-if="isTIcon"></i>
    <AppCIcon :name="icon" v-else-if="typeof icon === 'string'" />
  </el-icon>
</template>
