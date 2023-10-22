<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'

const popoverVisible = ref(false)
</script>

<template>
  <el-popover
    trigger="click"
    placement="bottom-start"
    v-model:visible="popoverVisible"
  >
    <template #reference>
      <div :class="[$style.select, popoverVisible && $style.active]">
        <span :class="$style.select_text">页面：空白页</span>
        <el-icon :class="$style.select_icon" :size="8">
          <ArrowDownBold />
        </el-icon>
      </div>
    </template>
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
</style>
