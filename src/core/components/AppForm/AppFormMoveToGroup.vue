<script lang="ts" setup>
import { reactive, ref } from 'vue'
import AppGroupSelect from '../AppControls/AppGroupSelect.vue'

const props = withDefaults(
  defineProps<{
    currentGroup?: string
  }>(),
  {
    currentGroup: ''
  }
)

const formRef = ref(null)
const formdata = reactive({ groupId: props.currentGroup })

defineExpose({ formRef, formdata })
</script>

<template>
  <el-form ref="formRef" :model="formdata" label-width="60px">
    <el-form-item label="分组">
      <AppGroupSelect v-model="formdata.groupId" />
    </el-form-item>
  </el-form>
</template>
