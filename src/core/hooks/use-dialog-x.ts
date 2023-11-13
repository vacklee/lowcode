import { defineAsyncComponent, ref } from 'vue'
import { DialogBtn, DialogEvents, useDialog } from './use-dialog'
import { FormInstance } from 'element-plus'
import { AppPage } from 'core/data/app'
import { FileBaseInfo } from '../data/file'
import { Expression } from '../data/code'

type WithDialogEvents<T> = T & { dialogEvents?: DialogEvents }

function cancelConfirmBtns(opts?: {
  onCancel?: () => unknown
  onConfirm?: () => unknown
}): DialogBtn[] {
  return [
    {
      content: '取消',
      onClick: opts?.onCancel
    },
    {
      content: '确定',
      type: 'primary',
      onClick: opts?.onConfirm
    }
  ]
}

type FormRef<T> = {
  formRef: FormInstance
  formdata: T
}
function validate<T>(ref: FormRef<T>, callback: (data: T) => void) {
  ref.formRef.validate(isValid => {
    if (isValid) {
      callback(ref.formdata)
    }
  })
}

export function useDialogX() {
  const { createDialog } = useDialog()

  /**
   * 重命名对话框
   */
  const showRenameDialog = (opts: {
    label: string
    currentName: string
    callback: (name: string) => void
    dialogEvents?: DialogEvents
  }) => {
    const dialog = createDialog({
      title: '重命名',
      width: 500,
      component: defineAsyncComponent(
        () => import('core/components/AppForm/AppFormRename.vue')
      ),
      componentProps: {
        label: opts.label,
        currentName: opts.currentName
      },
      btns: cancelConfirmBtns({
        onCancel: () => {
          dialog.close()
        },
        onConfirm: () => {
          const formRef = dialog.state.contentRef.formRef as FormInstance
          const formdata = dialog.state.contentRef.formdata as { name: string }
          formRef.validate(isValid => {
            if (isValid) {
              dialog.close()
              opts.callback(formdata.name)
            }
          })
        }
      }),
      ...(opts.dialogEvents || {})
    })
    return dialog
  }

  /**
   * 移动到分组
   */
  const showMoveToGroupDialog = (
    opts: WithDialogEvents<{ currentGroup: string }>,
    callback: (groupdId: string) => void
  ) => {
    const dialog = createDialog({
      title: '移动到分组',
      component: defineAsyncComponent(
        () => import('core/components/AppForm/AppFormMoveToGroup.vue')
      ),
      componentProps: {
        currentGroup: opts.currentGroup
      },
      btns: cancelConfirmBtns({
        onCancel: () => {
          dialog.close()
        },
        onConfirm: () => {
          validate(
            dialog.state.contentRef as unknown as FormRef<{
              groupId: string
            }>,
            ({ groupId }) => {
              callback(groupId)
              dialog.close()
            }
          )
        }
      }),
      ...(opts.dialogEvents || {})
    })
    return dialog
  }

  /**
   * 复制页面
   */
  const showCopyPageDialog = (
    page: AppPage,
    callback: (data?: { id: string; title: string }) => unknown
  ) => {
    const dialog = createDialog({
      title: '复制页面',
      component: defineAsyncComponent(
        () => import('core/components/AppForm/AppFormCopyPage.vue')
      ),
      componentProps: { page },
      btns: cancelConfirmBtns({
        onCancel: () => {
          dialog.close()
          callback()
        },
        onConfirm: () => {
          validate(
            dialog.state.contentRef as unknown as FormRef<{
              title: string
              id: string
            }>,
            data => {
              callback(data)
              dialog.close()
            }
          )
        }
      })
    })
    return dialog
  }

  /**
   * 选择图片素材
   */
  const showChooseImageDialog = (
    onSelect: (item: FileBaseInfo) => unknown,
    opts?: DialogEvents
  ) => {
    const dialog = createDialog({
      title: '素材管理',
      width: '1052px',
      nopadding: true,
      component: defineAsyncComponent(
        () => import('@/core/components/AppMaterial/AppMaterialImage.vue')
      ),
      componentProps: {
        inDialog: true,
        pickerMode: true,
        onSelect
      },
      ...(opts || {})
    })
    return dialog
  }

  /**
   * 代码编辑器
   */
  const showCodeEditorDialog = (opts?: {
    value?: Expression
    onSubmit?: (val?: Expression) => unknown
  }) => {
    const innerValue = ref(opts?.value)

    const dialog = createDialog({
      title: '代码编辑',
      width: '1000px',
      nopadding: true,
      fullHeight: true,
      noScroll: true,
      component: defineAsyncComponent(
        () => import('@/core/components/AppCodeEditor/AppCodeEditor.vue')
      ),
      componentProps: () => ({
        modelValue: innerValue.value,
        onChange: val => {
          innerValue.value = val
        }
      }),
      btns: [
        {
          content: '取消',
          onClick: () => {
            dialog.close()
          }
        },
        {
          content: '完成',
          type: 'primary',
          onClick: () => {
            opts?.onSubmit?.(innerValue.value)
            dialog.close()
          }
        }
      ]
    })
    return dialog
  }

  return {
    showRenameDialog,
    showMoveToGroupDialog,
    showCopyPageDialog,
    showChooseImageDialog,
    showCodeEditorDialog
  }
}
