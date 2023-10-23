<script lang="ts" setup>
import { AppPage } from 'core/data/app'
import { genId } from 'core/utils/common'
import { reactive, ref } from 'vue'

const props = defineProps<{
  page: AppPage
}>()

const formRef = ref(null)
const formdata = reactive({
  title: `${props.page.title}_副本`,
  id: genId()
})

const rules = {
  title: [{ required: true, message: '请填写页面标题' }],
  id: [{ required: true, message: '请填写页面ID' }]
}

defineExpose({ formRef, formdata })
</script>

<template>
  <el-alert :closable="false" :show-icon="true">
    复制当前页面为新的页面，页面内的组件配置会同步被复制
  </el-alert>
  <br />
  <el-form ref="formRef" :model="formdata" :rules="rules" label-width="70px">
    <el-form-item label="页面标题" prop="title">
      <el-input v-model="formdata.title" />
    </el-form-item>
    <el-form-item label="页面ID" prop="id">
      <el-input v-model="formdata.id" />
    </el-form-item>
  </el-form>
</template>
