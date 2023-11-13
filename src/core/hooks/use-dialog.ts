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

export type _PropsOf<P> = P extends { $props: infer T } ? T : never
export type PropsOf<C extends Component> = C extends Component<infer P>
  ? _PropsOf<P>
  : C extends DefineComponent<infer P>
  ? _PropsOf<P>
  : never

export type DialogEvents = {
  onOpen?: () => unknown
  onClosed?: () => unknown
}

export type DialogBtn = Partial<ButtonProps> & {
  content?: Component | string
  onClick?: () => unknown
}

export type UseDialogParams<C extends Component> = {
  title: string
  width?: string | number
  nopadding?: boolean
  fullHeight?: boolean
  noScroll?: boolean
  dialogProps?: Partial<DialogProps>
  component?: C
  componentProps?: PropsOf<C> | (() => PropsOf<C>)
  btns?: DialogBtn[]
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

    const renderContent = () => {
      const props =
        typeof params.componentProps === 'function'
          ? (params.componentProps as () => any)()
          : params.componentProps

      return h('div', { class: style.dialog_content }, [
        params.component
          ? h(params.component, {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref: (instance: any) => {
                state.contentRef = instance
              },
              ...(props || {})
            })
          : null
      ])
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
            width: params.width,
            modelValue: state.visible,
            class: [
              style.dialog,
              params.nopadding ? style.nopadding : '',
              params.fullHeight ? style.fullheight : ''
            ],
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
            default: () =>
              params.noScroll
                ? renderContent()
                : h(
                    ElScrollbar,
                    {},
                    {
                      default: renderContent
                    }
                  ),
            footer: params.btns?.length
              ? () =>
                  params.btns?.map(item =>
                    h(ElButton, item, {
                      default: () => item.content
                    })
                  )
              : null
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
