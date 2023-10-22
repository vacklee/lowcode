import { computed, defineAsyncComponent, getCurrentInstance } from 'vue'
import { FormInstance } from 'element-plus'
import { AppData } from '../data/app'
import { DialogEvents, useDialog } from './use-dialog'
import { genId } from 'core/utils/common'

export function useAppData() {
  const instance = getCurrentInstance()
  const appData = computed<AppData>(
    () => instance?.appContext.app.config.globalProperties.appData.value
  )
  return { appData }
}

// 页面节点
export type PageTreeNode<T extends 'F' | 'N'> = {
  type: T
  id: string
  title: string
  nodes: T extends 'F' ? PageTreeNode<'N'>[] : undefined
}
export function usePageTree() {
  const { appData } = useAppData()
  const pageTree = computed(() => {
    const tree: PageTreeNode<'F' | 'N'>[] = []
    appData.value.pageGroups.forEach(item => {
      tree.push({
        type: 'F',
        id: item.id,
        title: item.name,
        nodes: []
      })
    })
    appData.value.pages.forEach(item => {
      const _tree =
        tree.find(node => node.type === 'F' && node.id === item.groupdId)
          ?.nodes || tree

      _tree.push({
        type: 'N',
        id: item.id,
        title: item.title,
        nodes: void 0
      })
    })
    return tree
  })

  return {
    pageTree
  }
}

// 页面分组
export function usePageGroup() {
  const { appData } = useAppData()

  // 新建页面分组
  const createPageGroup = () => {
    const exits = appData.value.pageGroups
      .map(item => item.name)
      .filter(item => /^页面分组\d+$/.test(item))
      .map(item => +item.slice(4))

    const num = Math.max(0, ...exits) + 1
    const name = `页面分组${num}`

    appData.value.pageGroups.push({
      id: genId(),
      name
    })
  }

  return { createPageGroup }
}

// 页面
export function usePageData() {
  const { appData } = useAppData()
  const { createDialog } = useDialog()

  // 新建页面数据
  const addPage = (id: string, title: string) => {
    appData.value.pages.push({
      id,
      title,
      groupdId: '',
      nodeTree: []
    })
  }

  // 新建页面弹窗
  const createPage = (opts?: DialogEvents) => {
    const dialog = createDialog({
      title: '新建页面',
      dialogProps: {
        width: 500
      },
      component: defineAsyncComponent(
        () => import('core/components/AppForm/AppFormCreatePage.vue')
      ),
      btns: [
        {
          content: '取消',
          onClick() {
            dialog.close()
          }
        },
        {
          content: '确定',
          type: 'primary',
          onClick() {
            const instance = dialog.state.contentRef.formRef as FormInstance
            instance.validate(isValid => {
              if (isValid) {
                const formdata = dialog.state.contentRef.formdata as {
                  id: string
                  title: string
                }

                dialog.close()
                addPage(formdata.id, formdata.title)
              }
            })
          }
        }
      ],
      ...opts
    })

    return dialog
  }

  return {
    createPage
  }
}
