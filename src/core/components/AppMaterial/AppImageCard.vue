<script lang="ts" setup>
import { FileBaseInfo } from '@/core/data/file'
import AppIconBtn from '../AppControls/AppIconBtn.vue'
import { copyText, tipPromise } from '@/core/utils/common'

const props = defineProps<{
  data: FileBaseInfo
}>()

const emits = defineEmits(['delete'])

/** 复制图片链接 */
const handleCopy = () => {
  tipPromise(copyText(props.data.filePath), {
    successMsg: '复制成功',
    errorMsg: '复制失败：{e}'
  })
}

/** 删除图片 */
const handleDelete = () => {
  emits('delete')
}
</script>

<template>
  <div :class="$style.card">
    <img :class="$style.card_img" :src="data.filePath" />
    <div :class="$style.card_footer">
      <div :class="$style.card_name">{{ data.fileName }}</div>
      <div :class="$style.card_footer_right">
        <AppIconBtn
          icon="copy"
          title="点击复制图片链接"
          :hover-active="true"
          placement="top"
          @click="handleCopy"
        />

        <AppIconBtn
          icon="delete"
          title="删除"
          :hover-active="true"
          placement="top"
          theme="danger"
          @click="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.card {
  width: 248px;
  border: 1px solid $border-color-base;
  border-radius: $border-radius-base;
  box-sizing: border-box;
  position: relative;

  &_img {
    width: 100%;
    height: 139px;
    background: #eff0f3;
    object-fit: scale-down;
    cursor: zoom-in;
  }

  &_footer {
    height: 40px;
    padding: 0 $spacing-mini;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_right {
      display: flex;
      align-items: center;
      margin-left: $spacing-base;
      gap: $spacing-mini;
    }
  }

  &_name {
    flex: 1;
    width: 0;
    font-size: $font-size-normal;
    @include text-cut();
  }
}
</style>
