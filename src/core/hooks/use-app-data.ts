import { computed, defineAsyncComponent, getCurrentInstance, h } from 'vue'
import { FormInstance, ElMessageBox } from 'element-plus'
import { AppData, AppPage, AppPlatform, AppState } from '../data/app'
import { DialogEvents, useDialog } from './use-dialog'
import { genId } from 'core/utils/common'
import commonStyle from 'core/styles/common.module.scss'
import { heightlight } from 'core/utils/h'
import { useDialogX } from './use-dialog-x'
import { cloneDeep } from 'lodash'
import { canvasConfigMap } from 'core/config/canvas'
import { isPixel } from '../utils/unit'

export type DialogCallback<T = unknown> = (action: 'cancel' | 'confirm') => T

export function useAppData() {
  const instance = getCurrentInstance()
  const appData = computed<AppData>(
    () => instance?.appContext.app.config.globalProperties.appData.value
  )

  // 是否首页
  const isIndexPage = (pageId: string) => {
    return appData.value.state.indexPage === pageId
  }

  // 读取数据
  const getAppState = <K extends keyof AppState>(key: K) =>
    appData.value.state[key]

  // 设置数据
  const setAppState = <K extends keyof AppState>(key: K, val: AppState[K]) => {
    appData.value.state[key] = val
  }

  // 设置预览平台
  const setPlatfrom = (platform: AppPlatform) => {
    if (platform !== appData.value.state.platform) {
      setAppState('platform', platform)
    }
  }

  // 设置画布配置
  const setCanvasConfigName = (name: string) => {
    appData.value.state.canvasAttrs.name = name
  }

  // 获取当前选中节点的ID
  const getCurrentSelectedNodeId = () => {
    return getAppState('currentSelectNodeId')
  }
  // 设置当前选中节点的ID
  const setCurrentSelectedNodeId = (id: string) => {
    setAppState('currentSelectNodeId', id)
    if (id) {
      // 选择节点后自动切换到配置面板
      setAppState('rightPanelTab', 'settings')
    }
  }

  return {
    appData,
    isIndexPage,
    getAppState,
    setAppState,
    setPlatfrom,
    setCanvasConfigName,
    getCurrentSelectedNodeId,
    setCurrentSelectedNodeId
  }
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
    ).catch(() => 0)
  }

  return { createPageGroup, deletePageGroup }
}

// 页面
export function usePageData() {
  const { appData, setAppState } = useAppData()
  const { createDialog } = useDialog()
  const { showCopyPageDialog } = useDialogX()

  // 当前页面
  const currentPage = computed(() =>
    appData.value.pages.find(
      item => item.id === appData.value.state.currentPage
    )
  )

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
  const createPage = (
    opts?: DialogEvents,
    callback?: (pageId: string) => unknown
  ) => {
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
                callback?.(formdata.id)
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

  // 复制页面逻辑
  const _copyPage = (sourcePage: AppPage, newId: string, newTitle: string) => {
    const newPage = cloneDeep(sourcePage)
    newPage.id = newId
    newPage.title = newTitle
    appData.value.pages.push(newPage)
  }

  // 复制页面弹窗
  const copyPage = (pageId: string, callback?: DialogCallback) => {
    const page = appData.value.pages.find(item => item.id === pageId)!
    showCopyPageDialog(page, data => {
      if (data) {
        _copyPage(page, data.id, data.title)
      }
      callback?.(data ? 'confirm' : 'cancel')
    })
  }

  // 设置当前页面
  const setCurrentpage = (pageId: string) => {
    setAppState('currentPage', pageId)
  }

  return {
    createPage,
    moveToGroup,
    deletePage,
    _deletePage,
    copyPage,
    _copyPage,
    setCurrentpage,
    currentPage
  }
}

// 画布数据
export function useCanvasData() {
  const { appData, getAppState } = useAppData()

  /**
   * 画布宽、高、缩放
   */
  const canvasAttrs = computed<{
    width: number
    height: number
    scale: number
  } | null>(() => {
    const _canvasAttrs = getAppState('canvasAttrs')
    const platform = getAppState('platform')
    if (platform === AppPlatform.PC) {
      return null
    }

    let { width, height } = _canvasAttrs
    if (_canvasAttrs.name) {
      const config = canvasConfigMap.find(
        item => item.name === _canvasAttrs.name
      )!
      width = config.width
      height = config.height
    }

    return {
      width,
      height,
      scale: _canvasAttrs.scale
    }
  })

  /**
   * 设置画布缩放
   */
  const setScale = (scale: number) => {
    appData.value.state.canvasAttrs.scale = scale
  }

  // 像素换算
  const toPx = (pixel: unknown) => {
    if (!isPixel(pixel)) return '0px'
    const [, numStr, uniStr] = pixel.match(/^(\d+)(px|rem|rpx)$/)!
    let num = +numStr
    if (uniStr === 'rem') {
      num *= 10
    } else if (uniStr === 'rpx' && canvasAttrs.value) {
      num = canvasAttrs.value.width * (num / 750)
    }
    return `${num}px`
  }

  return {
    canvasAttrs,
    setScale,
    toPx
  }
}
