<script lang="ts" setup>
import { AppComponent } from '@/core/data/component'
import AppIcon from '../AppIcon.vue'
import { copyText, tipPromise } from '@/core/utils/common'

const props = defineProps<{
  node: AppComponent
}>()

const copyId = () => {
  tipPromise(copyText(props.node.instanceID), {
    successMsg: '复制成功',
    errorMsg: '复制失败：{e}'
  })
}
</script>

<template>
  <div :class="$style.cell">
    <div :class="$style.cell_icon">
      <AppIcon :icon="node.basicInfo.icon" :size="18" />
    </div>
    <div :class="$style.cell_info">
      <div :class="$style.cell_info_top">
        <div :class="$style.cell_title">{{ node.instanceName }}</div>
      </div>
      <div :class="$style.cell_copy">
        <span>{{ node.instanceID }}</span>
        <el-tooltip content="复制" :show-after="1000">
          <AppIcon
            :class="$style.cell_copy_icon"
            icon="t-icon-copy"
            @click="copyId"
          />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.cell {
  display: flex;
  padding: $spacing-mini $spacing-small $spacing-small;
  border-bottom: 1px solid $border-color-base;

  &_icon {
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid $border-color-base;
    border-radius: $border-radius-base;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: $spacing-small;
  }

  &_info {
    flex: 1;
    width: 0;

    &_top {
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &_title {
    flex: 1;
    width: 0;
    @include text-cut();
  }

  &_copy {
    display: flex;
    align-items: center;
    color: $text-color-gray;
    gap: $spacing-mini;

    &_icon {
      cursor: pointer;
    }
  }
}
</style>
