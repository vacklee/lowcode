import { defineAsyncComponent } from 'vue'
import { DialogBtn, DialogEvents, useDialog } from './use-dialog'
import { FormInstance } from 'element-plus'

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

  return {
    showRenameDialog
  }
}
