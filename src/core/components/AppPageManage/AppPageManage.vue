<script lang="ts" setup>
import {
  FolderAdd,
  Plus,
  Search,
  Folder,
  Document,
  More
} from '@element-plus/icons-vue'
import {
  usePageTree,
  usePageGroup,
  usePageData,
  PageTreeNode
} from 'core/hooks/use-app-data'
import { useDialogX } from 'core/hooks/use-dialog-x'

const emits = defineEmits(['command', 'dialog-open', 'dialog-closed'])

const { pageTree, renameNode } = usePageTree()
const { createPageGroup } = usePageGroup()
const { createPage } = usePageData()
const { showRenameDialog } = useDialogX()

const dialogEvents = {
  onOpen: () => emits('dialog-open'),
  onClosed: () => emits('dialog-closed')
}

const onCommand = (item: PageTreeNode<'F' | 'N'>, command: string) => {
  emits('command')
  switch (command) {
    case 'rename':
      showRenameDialog({
        label: '标题',
        currentName: item.title,
        callback(name) {
          renameNode(item, name)
        },
        dialogEvents
      })
  }
}

const _createPage = () => {
  createPage(dialogEvents)
}
</script>

<template>
  <div :class="$style.box">
    <div :class="$style.box_top">
      <div :class="$style.box_title">页面</div>
      <div :class="$style.box_actions">
        <el-button :icon="FolderAdd" size="small" @click="createPageGroup">
          新建分组
        </el-button>
        <el-button
          :icon="Plus"
          size="small"
          type="primary"
          @click="_createPage"
        >
          新建页面
        </el-button>
      </div>
    </div>

    <div :class="$style.box_search">
      <el-input placeholder="搜索名称、ID" size="small" :prefix-icon="Search" />
    </div>

    <div :class="$style.box_tree" v-if="pageTree.length">
      <el-tree
        :data="pageTree"
        :props="{
          label: 'title',
          children: 'nodes'
        }"
        node-key="id"
      >
        <template #default="{ data }">
          <div :class="$style.node">
            <div :class="$style.node_left">
              <el-icon :class="$style.node_icon">
                <component :is="data.type === 'N' ? Document : Folder" />
              </el-icon>
              <div :class="$style.node_title">
                <span :class="$style.node_title">{{ data.title }}</span>
                <span :class="$style.node_id" v-if="data.type === 'N'">
                  ({{ data.id }})
                </span>
              </div>
            </div>

            <div :class="$style.node_right">
              <el-dropdown
                size="small"
                placement="bottom-start"
                trigger="click"
                @command="onCommand(data, $event)"
              >
                <el-button :icon="More" size="small" text @click.stop />
                <template #dropdown>
                  <el-dropdown-menu>
                    <template v-if="data.type === 'N'">
                      <el-dropdown-item :class="$style.dropdown_item">
                        设为首页
                      </el-dropdown-item>
                      <el-dropdown-item :class="$style.dropdown_item">
                        复制页面
                      </el-dropdown-item>
                      <el-dropdown-item :class="$style.dropdown_item">
                        复制页面ID
                      </el-dropdown-item>
                      <el-dropdown-item :class="$style.dropdown_item">
                        移动到分组
                      </el-dropdown-item>
                    </template>

                    <el-dropdown-item
                      :class="$style.dropdown_item"
                      command="rename"
                    >
                      重命名
                    </el-dropdown-item>
                    <el-dropdown-item
                      :class="[$style.dropdown_item, $style.delete]"
                    >
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-small;
  &_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-small;
  }

  &_search {
    margin-bottom: $spacing-small;
  }

  .node {
    flex: 1;
    width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_left,
    &_right {
      display: flex;
      align-items: center;
    }

    &_icon {
      margin-right: $spacing-mini;
    }

    &_id {
      color: $text-color-gray;
      margin-left: $spacing-mini;
    }

    &_left {
      flex: 1;
      width: 0;
    }

    &_title {
      flex: 1;
      width: 0;
      @include text-cut();
    }
  }
}

.dropdown_item {
  height: 32px;
  min-width: 150px;

  &.delete {
    color: var(--el-color-danger);

    &:not(:global(.is-disabled)):focus {
      color: var(--el-color-danger);
      background-color: var(--el-color-danger-light-9);
    }
  }
}
</style>
