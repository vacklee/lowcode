<script lang="ts" setup>
import { ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import AppPoppover from '../AppPoppover.vue'
import AppExportPanel from './AppExportPanel.vue'

const popperRef = ref<InstanceType<typeof AppPoppover> | null>(null)
const onCancel = () => {
  popperRef.value!.popoverVisible = false
}
</script>

<template>
  <AppPoppover ref="popperRef" :popper-width="400" placement="bottom-end">
    <template #reference>
      <el-button type="primary" :icon="Upload" size="small">导出</el-button>
    </template>

    <AppExportPanel @cancel="onCancel" />
  </AppPoppover>
</template>
