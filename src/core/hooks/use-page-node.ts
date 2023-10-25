import { computed } from 'vue'
import { useAppData } from './use-app-data'
import { AllComponentIds, createComponentInstance } from '../config/components'
import { Constants } from '../config/constant'
import { deepFind } from '../utils/common'
import { AppComponent } from '../data/component'

/** 页面节点相关 */
export function usePageNode() {
  const {
    appData,
    getAppState,
    setCurrentSelectedNodeId,
    getCurrentSelectedNodeId
  } = useAppData()

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
    console.log(bodyNode.value)
    return newComp
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

  return {
    currentPage,
    getNodeById,
    getParentNode,
    insertNode,
    bodyNode,
    getNodePaths,
    checkIsSubNodeId,
    currentNode
  }
}
