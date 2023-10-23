<script lang="ts" setup>
import AppPageSelect from './AppPageSelect.vue'
import AppCreatePageBtn from './AppCreatePageBtn.vue'
import AppPlatformSelect from '../AppControls/AppPlatformSelect.vue'
import { computed } from 'vue'
import { useAppData } from 'core/hooks/use-app-data'

const { getAppState, setPlatfrom } = useAppData()
const currentPlatform = computed({
  get: () => getAppState('platform'),
  set: setPlatfrom
})
</script>

<template>
  <div :class="$style.editor">
    <div :class="$style.editor_header">
      <div :class="$style.editor_header_left">
        <AppPageSelect />
        <AppCreatePageBtn />
        <AppPlatformSelect v-model="currentPlatform" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.editor {
  width: 100%;
  height: 100%;
  background: #ebeef0;

  &_header {
    height: 40px;
    background: #fff;
    border-bottom: 1px solid $border-color-base;
    display: flex;
    align-items: center;
    padding: 0 $spacing-medium;

    &_left {
      display: flex;
      align-items: center;
      gap: $spacing-mini;
    }
  }
}
</style>
