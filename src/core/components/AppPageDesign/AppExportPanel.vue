<script lang="ts" setup>
import { computed, ref, toRaw } from 'vue'
import { exportOptions, ExportType, exports } from '@/core/features/exports'
import { useAppData } from '@/core/hooks/use-app-data'

const { appData } = useAppData()

const emits = defineEmits(['cancel'])
const exportsSelect = ref<ExportType[]>(
  exportOptions.filter(item => item.default).map(item => item.id)
)

const confirmDisabled = computed(() => !exportsSelect.value.length)
const confirmLoading = ref(false)
const onConfirm = () => {
  if (confirmDisabled.value || confirmLoading.value) {
    return
  }

  confirmLoading.value = true
  exports(
    exportsSelect.value.map(type => ({ type })),
    toRaw(appData.value)
  ).finally(() => {
    confirmLoading.value = false
  })
}
</script>

<template>
  <div :class="$style.box">
    <div :class="$style.box_title">导出当前应用</div>

    <!-- 导出为 -->
    <div :class="$style.box_form">
      <div :class="$style.box_form_label">导出为</div>
      <el-checkbox-group
        v-model="exportsSelect"
        :class="$style.box_form_controls"
        size="small"
      >
        <el-checkbox
          v-for="item in exportOptions"
          :key="item.id"
          :label="item.id"
        >
          {{ item.title }}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <div :class="$style.box_footer">
      <span :class="$style.box_footer_tip" v-show="confirmDisabled">
        未选择导出类型
      </span>
      <el-button
        type="primary"
        size="small"
        :disabled="confirmDisabled"
        :loading="confirmLoading"
        @click="onConfirm"
      >
        确认
      </el-button>
      <el-button size="small" @click="emits('cancel')">取消</el-button>
    </div>
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-small;

  &_title {
    font-size: $font-size-normal;
    font-weight: 600;
    margin-bottom: $spacing-small;
  }

  &_form {
    display: flex;

    &_label {
      margin-right: $spacing-medium;
      line-height: 24px;
      color: $text-color-gray;
    }

    &_controls {
      flex: 1;
      width: 0;
      display: flex;
      flex-direction: column;
    }
  }

  &_footer {
    padding-top: $spacing-small;
    margin-top: $spacing-base;
    border-top: 1px solid $border-color-base;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &_tip {
      color: $color-danger;
      margin-right: $spacing-mini;
    }
  }
}
</style>
