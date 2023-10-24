import { computed } from 'vue'
import { useAppData } from './use-app-data'
import { AllComponentIds, createComponentInstance } from '../config/components'
import { Constants } from '../config/constant'
import { deepFind } from '../utils/common'
import { AppComponent } from '../data/component'

/** 页面节点相关 */
export function usePageNode() {
  const { appData, getAppState } = useAppData()

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

  // 往当前页面插入节点
  const insertNode = (nodeId: string, componentId: AllComponentIds) => {
    const targetNode = getNodeById(nodeId)!
    const newComp = createComponentInstance(componentId)
    targetNode.nodes.push(newComp)
    console.log(bodyNode.value)
    return newComp
  }

  return {
    currentPage,
    getNodeById,
    insertNode,
    bodyNode
  }
}
