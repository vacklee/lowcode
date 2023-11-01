<script lang="ts" setup>
import { FileBaseInfo } from '@/core/data/file'
import AppIconBtn from '../AppControls/AppIconBtn.vue'
import { copyText, tipPromise } from '@/core/utils/common'
import { Select } from '@element-plus/icons-vue'

const props = defineProps<{
  data: FileBaseInfo
  // 选择模式
  pickerMode?: boolean
}>()

const emits = defineEmits(['delete', 'select'])

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

/** 选择 */
const handleSelect = () => {
  emits('select')
}
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.card_img">
      <img :src="data.filePath" />
      <div :class="$style.card_pick" v-if="pickerMode">
        <el-button
          :class="$style.card_pick_action"
          :icon="Select"
          type="primary"
          @click="handleSelect"
        >
          使用素材
        </el-button>
      </div>
    </div>
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
    position: relative;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
      cursor: zoom-in;
    }
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

  &_pick {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    &_action {
      visibility: hidden;
    }

    &:hover {
      background: rgba(#000, 0.4);

      & > .card_pick_action {
        visibility: visible;
      }
    }
  }
}
</style>
