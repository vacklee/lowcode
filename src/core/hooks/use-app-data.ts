import { v4 } from 'uuid'
import { computed, getCurrentInstance } from 'vue'
import { AppData } from '../data/app'

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
      id: v4(),
      name
    })
  }

  return { createPageGroup }
}
