import { computed } from 'vue'
import { useAppData, useCanvasData } from './use-app-data'
import { AllComponentIds, createComponentInstance } from '../config/components'
import { Constants } from '../config/constant'
import { deepFind } from '../utils/common'
import { AppComponent } from '../data/component'
import { useEvents } from './use-events'
import {
  InsetStyle,
  InsetStyleKey,
  transformInsetStyle
} from '../config/styles'

/** 页面节点相关 */
export function usePageNode() {
  const {
    appData,
    getAppState,
    setCurrentSelectedNodeId,
    getCurrentSelectedNodeId
  } = useAppData()

  const { toPx } = useCanvasData()

  const { on, emit } = useEvents()

  // 当前页面
  const currentPage = computed(() => {
    return appData.value.pages.find(
      item => item.id === getAppState('currentPage')
    )
  })

  // body节点
  const bodyNode = computed<AppComponent | null>(() => {
    if (!currentPage.value) return null
    const node = createComponentInstance(
      Constants.BODY_NODE_ID,
      Constants.BODY_NODE_ID
    )
    node.nodes = currentPage.value.nodeTree
    node.instanceName = `页面：${currentPage.value.title}`
    node.visualCss = currentPage.value.bodyVisualCss
    return node
  })

  // 获取节点
  const getNodeById = (id: string) => {
    if (!bodyNode.value) return null
    return (
      deepFind(
        [bodyNode.value],
        item => item.instanceID === id,
        item => item.nodes
      ) || null
    )
  }

  // 获取父节点
  const getParentNode = (node: string | AppComponent) => {
    if (!bodyNode.value) return null
    const id = typeof node === 'string' ? node : node.instanceID
    return (
      deepFind(
        [bodyNode.value],
        item => item.nodes.some(sub => sub.instanceID === id),
        item => item.nodes
      ) || null
    )
  }

  // 往当前页面插入节点
  const insertNode = (
    nodeId: string,
    componentId: AllComponentIds,
    autoSelect = false
  ) => {
    const targetNode = getNodeById(nodeId)!
    const newComp = createComponentInstance(componentId)
    targetNode.nodes.push(newComp)
    autoSelect && setCurrentSelectedNodeId(newComp.instanceID)
    // console.log(bodyNode.value)
    return newComp
  }

  /** 删除节点 */
  const deleteNode = (nodeId: string) => {
    const parentNode = getParentNode(nodeId)
    if (!parentNode) return false
    const index = parentNode.nodes.findIndex(item => item.instanceID === nodeId)
    if (index > -1) {
      parentNode.nodes.splice(index, 1)
      return true
    }
    return false
  }

  /** 删除节点 */
  const spliceNode = (
    parentId: string | AppComponent,
    startIndex: number,
    deleteNum?: number,
    ...newNodes: AppComponent[]
  ) => {
    const parentNode =
      typeof parentId === 'string' ? getNodeById(parentId) : parentId
    if (!parentNode) return
    parentNode.nodes.splice(
      startIndex,
      deleteNum ?? parentNode.nodes.length,
      ...newNodes
    )
  }

  /** 获取节点路径 */
  const getNodePaths = (id: string | AppComponent) => {
    if (!bodyNode.value) return []
    const node = typeof id === 'string' ? getNodeById(id) : id
    if (!node) return []
    const paths = [node]
    let parentNode = getParentNode(node)
    while (parentNode) {
      paths.unshift(parentNode)
      parentNode = getParentNode(parentNode)
    }
    return paths
  }

  /** 判断是否为子孙节点ID */
  const checkIsSubNodeId = (parentNodeId: string, checkNodeId: string) => {
    if (parentNodeId === checkNodeId) return false
    const nodePaths = getNodePaths(checkNodeId)
    return nodePaths.some(item => item.instanceID === parentNodeId)
  }

  /** 当前选中的节点 */
  const currentNode = computed(() => {
    return getNodeById(getCurrentSelectedNodeId())
  })

  /** 监听节点事件 */
  const watchNode = <T = unknown>(
    node: AppComponent,
    name: string,
    handle: (opts: { node: AppComponent; value: T }) => unknown,
    once = false
  ) => {
    return on(`NODE:${node.instanceID}:${name}`, handle, once)
  }

  /** 触发节点事件 */
  const emitNode = (node: AppComponent, name: string, value: unknown) => {
    emit(`NODE:${node.instanceID}:${name}`, {
      node,
      value
    })
  }

  /** 设置节点属性 */
  const setNodeAttrs = (
    id: string,
    type: 'baseAttrs' | 'heightAttrs',
    key: string,
    value: unknown
  ) => {
    const node = getNodeById(id)
    if (node) {
      if (/^emit:/.test(key)) {
        emitNode(node, key.slice(5), value)
        return
      }
      node[type][key] = value
    }
  }

  /** 设置CSS属性 */
  const setVirsualCss = <K extends InsetStyleKey>(
    node: AppComponent,
    key: K,
    val: InsetStyle[K] | null
  ) => {
    if (val === null) {
      delete node.visualCss[key]
    } else {
      node.visualCss[key] = val
    }
  }

  /** 获取CSS属性 */
  const useVirsualCss = <K extends InsetStyleKey>(
    node: () => AppComponent,
    key: K
  ) =>
    computed({
      get: () => node().visualCss[key],
      set: val => setVirsualCss(node(), key, val ?? null)
    })

  /** 计算内联样式 */
  const computedInsetStyles = (node: AppComponent) =>
    transformInsetStyle(node.visualCss, { toPx })

  return {
    currentPage,
    getNodeById,
    getParentNode,
    insertNode,
    bodyNode,
    getNodePaths,
    checkIsSubNodeId,
    currentNode,
    setNodeAttrs,
    watchNode,
    emitNode,
    deleteNode,
    spliceNode,
    useVirsualCss,
    setVirsualCss,
    computedInsetStyles
  }
}
