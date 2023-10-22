<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    labelWidth?: number
    currentName?: string
  }>(),
  {
    currentName: '',
    labelWidth: 60
  }
)

const formRef = ref(null)
const formdata = reactive({
  name: props.currentName
})

const rules = computed(() => ({
  name: [{ required: true, message: `请填写${props.label}` }]
}))

defineExpose({
  formRef,
  formdata
})
</script>

<template>
  <el-form
    ref="formRef"
    :model="formdata"
    :rules="rules"
    :label-width="labelWidth"
  >
    <el-form-item :label="label" prop="name">
      <el-input v-model="formdata.name" />
    </el-form-item>
  </el-form>
</template>
