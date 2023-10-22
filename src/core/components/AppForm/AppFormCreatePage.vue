<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { genId } from 'core/utils/common'

const formRef = ref(null)
const formdata = reactive({
  id: genId(),
  title: '空白页'
})

const rules = reactive({
  id: [{ required: true, message: '请输入标题' }],
  title: [{ required: true, message: '请输入页面ID' }]
})

defineExpose({
  formRef,
  formdata
})
</script>

<template>
  <el-form ref="formRef" :model="formdata" :rules="rules" label-width="60px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="formdata.title" />
    </el-form-item>
    <el-form-item label="页面ID" prop="id">
      <el-input v-model="formdata.id" />
    </el-form-item>
  </el-form>
</template>
