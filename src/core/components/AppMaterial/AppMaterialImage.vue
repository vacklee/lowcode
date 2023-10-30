<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Upload, Search } from '@element-plus/icons-vue'
import { useImageResource, SearchNext, FileUpload } from '@/core/hooks/use-file'
import { useSearchNext } from '@/core/hooks/use-search-next'
import AppImageCard from './AppImageCard.vue'
import { ElMessage, ElScrollbar } from 'element-plus'
import { chooseFile } from '@/core/utils/common'

const props = withDefaults(
  defineProps<{
    sizeLimit?: string
    typeLimit?: string[]
    hooks?: () => {
      upload: FileUpload
      searchNext: SearchNext
    }
  }>(),
  {
    sizeLimit: '2MB',
    typeLimit: () => ['png', 'jpg', 'gif', 'svg'],
    hooks: useImageResource
  }
)

/** 搜索 */
const keyword = ref('')
const { searchNext, upload } = props.hooks()
const scrollRef = ref<InstanceType<typeof ElScrollbar>>(null!)
const { data, initLoading, initLoad, resetStates } = useSearchNext(
  searchNext,
  10,
  () => scrollRef.value.wrapRef!,
  () => ({ keyword: keyword.value })
)

const actionTip = computed(() => {
  return `请上传大小在${props.sizeLimit}以内的${props.typeLimit.join(
    '、'
  )}文件，支持批量上传`
})

onMounted(async () => {
  await initLoad()
})

watch(keyword, () => {
  resetStates()
  initLoad()
})

/** 上传图片 */
const uploading = ref(false)
const handleUpload = async () => {
  chooseFile({
    multiple: true,
    limitSize: props.sizeLimit,
    limitType: props.typeLimit,
    onTypeError: () => ElMessage.error('不支持该类型'),
    onSizeError: () => ElMessage.error(`图片大小超出${props.sizeLimit}`)
  })
    .then(async files => {
      uploading.value = true
      try {
        return await files.reduce(async (_, file) => {
          await _
          const node = await upload(file)
          data.value.unshift(node)
        }, Promise.resolve())
      } finally {
        uploading.value = false
      }
    })
    .catch(() => 0)
}
</script>

<template>
  <div :class="$style.panel">
    <div :class="$style.panel_header">
      <!-- 上传按钮 -->
      <div :class="$style.panel_action">
        <el-button type="primary" :icon="Upload" @click="handleUpload">
          上传图片
        </el-button>
        <span :class="$style.panel_action_tip">{{ actionTip }}</span>
      </div>

      <!-- 搜索框 -->
      <div :class="$style.panel_search">
        <el-input
          :prefix-icon="Search"
          placeholder="输入关键词搜索"
          v-model="keyword"
        ></el-input>
      </div>
    </div>
    <div :class="$style.panel_content">
      <div
        :class="[$style.panel_content_mask, $style.is_uploading]"
        v-if="initLoading || uploading"
        v-loading="true"
      ></div>

      <el-scrollbar :class="$style.panel_content_scroll" ref="scrollRef">
        <div :class="$style.panel_images">
          <AppImageCard v-for="item in data" :key="item.fileId" :data="item" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" module>
.panel {
  flex: 1;
  height: 0;
  background: #fff;
  border-radius: $border-radius-base;
  display: flex;
  flex-direction: column;

  &_header {
    padding: $spacing-small;
    border-bottom: 1px solid $border-color-base;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &_content {
    flex: 1;
    height: 0;
    display: flex;
    flex-direction: column;
    position: relative;

    &_scroll,
    &_mask {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
    }

    &_mask {
      background: #fff;
      z-index: 10;

      &.is_uploading {
        background: rgba(#fff, 0.6);
      }
    }
  }

  &_action {
    display: flex;
    align-items: center;

    &_tip {
      color: $text-color-placeholder;
      margin-left: $spacing-mini;
    }
  }

  &_search {
    flex: 1;
    max-width: 320px;
    margin-left: $spacing-base;
  }

  &_images {
    display: grid;
    grid-template-columns: repeat(auto-fill, 267px);
    justify-content: space-around;
    justify-items: center;
    row-gap: $spacing-small;
    padding: $spacing-small 0;
  }
}
</style>
