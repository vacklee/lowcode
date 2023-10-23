<script lang="ts" setup>
import { computed, ref } from 'vue'
import { debounce } from 'lodash'
import { ArrowDownBold } from '@element-plus/icons-vue'
import AppPageManage from '../AppPageManage/AppPageManage.vue'
import { usePageData } from 'core/hooks/use-app-data'

const { currentPage } = usePageData()

const _popoverVisible = ref(false)

/**
 * _popoverVisibleStop 为 true 时表示在 popover 弹层中点击了插入在 body 层的按钮
 * 此时应该阻止弹层隐藏
 */
const _popoverVisibleStop = ref(false)
const _popoverVisibleStopResume = debounce(() => {
  _popoverVisibleStop.value = false
}, 500)

const popoverVisible = computed({
  get: () => _popoverVisible.value,
  set: val => {
    if (_popoverVisibleStop.value) {
      return
    }
    _popoverVisible.value = val
  }
})

const onCommand = () => {
  _popoverVisibleStop.value = true
  _popoverVisibleStopResume()
}

const onDialogOpen = () => {
  _popoverVisibleStop.value = true
  _popoverVisibleStopResume.cancel()
}
</script>

<template>
  <el-popover
    trigger="click"
    placement="bottom-start"
    :width="320"
    :popper-class="$style.popper"
    v-model:visible="popoverVisible"
  >
    <template #reference>
      <div :class="[$style.select, popoverVisible && $style.active]">
        <span :class="$style.select_text">
          页面：{{ currentPage?.title || '' }}
        </span>
        <el-icon :class="$style.select_icon" :size="8">
          <ArrowDownBold />
        </el-icon>
      </div>
    </template>

    <el-scrollbar :max-height="630">
      <AppPageManage
        @command="onCommand"
        @dialog-open="onDialogOpen"
        @dialog-closed="_popoverVisibleStopResume"
      />
    </el-scrollbar>
  </el-popover>
</template>

<style lang="scss" module>
.select {
  width: 224px;
  height: 28px;
  padding: 0 $spacing-mini;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: $border-radius-base;
  transition: background 0.2s linear;

  &_text {
    font-weight: bold;
    max-width: 102px;
    @include text-cut();
  }

  &_icon {
    margin-left: $spacing-mini;
  }

  &:hover,
  &.active {
    background: #ebedf1;
    justify-content: space-between;
  }
}

.popper {
  padding: 0 !important;
}
</style>
