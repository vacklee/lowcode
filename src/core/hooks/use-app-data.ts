import { computed, defineAsyncComponent, getCurrentInstance, h } from 'vue'
import { FormInstance, ElMessageBox } from 'element-plus'
import { AppData, AppState } from '../data/app'
import { DialogEvents, useDialog } from './use-dialog'
import { genId } from 'core/utils/common'
import commonStyle from 'core/styles/common.module.scss'
import { heightlight } from 'core/utils/h'

export function useAppData() {
  const instance = getCurrentInstance()
  const appData = computed<AppData>(
    () => instance?.appContext.app.config.globalProperties.appData.value
  )

  // 是否首页
  const isIndexPage = (pageId: string) => {
    return appData.value.state.indexPage === pageId
  }

  // 设置数据
  const setAppState = <K extends keyof AppState>(key: K, val: AppState[K]) => {
    appData.value.state[key] = val
  }

  return { appData, isIndexPage, setAppState }
}

// 页面节点
export type PageTreeNode<T extends 'F' | 'N'> = {
  type: T
  id: string
  title: string
  nodes: T extends 'F' ? PageTreeNode<'N'>[] : undefined
  groupdId: T extends 'F' ? undefined : string
  isIndex: boolean
}
export function usePageTree() {
  const { appData, isIndexPage } = useAppData()
  const pageTree = computed(() => {
    const tree: PageTreeNode<'F' | 'N'>[] = []
    appData.value.pageGroups.forEach(item => {
      tree.push({
        type: 'F',
        id: item.id,
        title: item.title,
        nodes: [],
        groupdId: void 0,
        isIndex: false
      })
    })
    appData.value.pages.forEach(item => {
      const group = tree.find(
        node => node.type === 'F' && node.id === item.groupdId
      )
      const _tree = group?.nodes || tree

      _tree.push({
        type: 'N',
        id: item.id,
        title: item.title,
        nodes: void 0,
        groupdId: group?.id,
        isIndex: isIndexPage(item.id)
      })
    })
    return tree
  })

  // 重命名分组或页面
  const renameNode = (node: PageTreeNode<'F' | 'N'>, name: string) => {
    const datas =
      node.type === 'F' ? appData.value.pageGroups : appData.value.pages
    const target = datas.find(item => item.id === node.id)
    if (target) {
      target.title = name
    }
  }

  return {
    pageTree,
    renameNode
  }
}

// 页面分组
export function usePageGroup() {
  const { appData } = useAppData()
  const { _deletePage } = usePageData()

  // 新建页面分组
  const createPageGroup = () => {
    const exits = appData.value.pageGroups
      .map(item => item.title)
      .filter(item => /^页面分组\d+$/.test(item))
      .map(item => +item.slice(4))

    const num = Math.max(0, ...exits) + 1
    const title = `页面分组${num}`

    appData.value.pageGroups.push({
      id: genId(),
      title
    })
  }

  // 删除分组
  const deletePageGroup = (groupId: string, callback?: () => void) => {
    const group = appData.value.pageGroups.find(item => item.id === groupId)!
    const pages = appData.value.pages.filter(item => item.groupdId === groupId)
    const dothat = () => {
      pages.forEach(item => _deletePage(item.id))
      const index = appData.value.pageGroups.indexOf(group)
      appData.value.pageGroups.splice(index, 1)
      callback?.()
    }

    if (!pages.length) {
      dothat()
      return
    }

    ElMessageBox.confirm(
      h('div', [
        h('div', ['确认删除分组 ', heightlight(group.title), ' ？']),
        h('div', [
          '该分组及其包含的 ',
          heightlight(`${pages.length}`),
          ' 个页面将不可恢复：'
        ]),
        ...pages.map(item => h('div', item.title))
      ]),
      {
        type: 'warning',
        beforeClose(action, _, done) {
          if (action === 'confirm') {
            dothat()
          }
          done()
        }
      }
    )
  }

  return { createPageGroup, deletePageGroup }
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

  // 移动到分组
  const moveToGroup = (pageId: string, groupId: string) => {
    const targetPage = appData.value.pages.find(item => item.id === pageId)!
    targetPage.groupdId = groupId
  }

  // 删除页面逻辑
  const _deletePage = (pageId: string) => {
    const page = appData.value.pages.find(item => item.id === pageId)!
    const index = appData.value.pages.indexOf(page)
    appData.value.pages.splice(index, 1)
  }

  // 删除页面弹窗
  const deletePage = (pageId: string, callback?: () => void) => {
    const page = appData.value.pages.find(item => item.id === pageId)!

    ElMessageBox.confirm(
      h('span', [
        '确认删除页面 ',
        h('span', { class: commonStyle.heightlight }, page.title),
        ' ？'
      ]),
      {
        type: 'warning',
        beforeClose(action, _, done) {
          if (action === 'confirm') {
            _deletePage(pageId)
          }
          done()
          callback?.()
        }
      }
    ).catch(() => 0)
  }

  return {
    createPage,
    moveToGroup,
    deletePage,
    _deletePage
  }
}
