import { Component, DefineComponent, createApp, h, reactive } from 'vue'
import {
  DialogProps,
  ElDialog,
  ElScrollbar,
  ButtonProps,
  ElButton
} from 'element-plus'
import { useAppData } from './use-app-data'
import style from 'core/styles/dialog.module.scss'
import appPlugins from 'core/expose/app-plugins'

export type PropsOf<C extends Component> = C extends Component<infer P>
  ? P
  : never

export type DialogEvents = {
  onOpen?: () => unknown
  onClosed?: () => unknown
}

export type UseDialogParams<C extends Component> = {
  title: string
  dialogProps?: Partial<DialogProps>
  component?: C
  componentProps?: PropsOf<C>
  btns?: (Partial<ButtonProps> & {
    content?: Component | string
    onClick?: () => unknown
  })[]
} & DialogEvents

export function useDialog() {
  const { appData } = useAppData()

  const createDialog = <C extends Component>(params: UseDialogParams<C>) => {
    const el = document.createElement('div')
    const state = reactive({
      visible: false,
      dialogRef: null as unknown as InstanceType<typeof ElDialog>,
      contentRef: null as unknown as InstanceType<DefineComponent<C>>
    })

    const open = () => {
      state.visible = true
    }

    const close = () => {
      state.visible = false
    }

    const app = createApp({
      render: () =>
        h(
          ElDialog,
          {
            ref: instance => {
              state.dialogRef = instance as InstanceType<typeof ElDialog>
            },
            title: params.title,
            modelValue: state.visible,
            customClass: style.dialog,
            modalClass: style.dialog_modal,
            modal: false,
            appendTobody: true,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            draggable: true,
            onOpen: () => {
              params.onOpen?.()
            },
            onClosed: () => {
              params.onClosed?.()
              app.unmount()
            },
            ...(params.dialogProps || {})
          },
          {
            default: h(ElScrollbar, {}, [
              h('div', { class: style.dialog_content }, [
                params.component
                  ? h(params.component, {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ref: (instance: any) => {
                        state.contentRef = instance
                      },
                      ...(params.componentProps || {})
                    })
                  : null
              ])
            ]),
            footer: params.btns?.map(item =>
              h(ElButton, item, {
                default: item.content
              })
            )
          }
        ),

      mounted() {
        open()
      },

      unmounted() {
        el.remove()
      }
    })

    app.config.globalProperties.appData = appData

    app.use(appPlugins)
    app.mount(el)
    document.body.appendChild(el)

    return {
      state,
      open,
      close
    }
  }

  return {
    createDialog
  }
}
