import { createComponentInstance } from '../config/components'
import { AppData, DATA_VERSION } from '../data/app'
import { AppComponent } from '../data/component'

export function recoverJson(node: any, target: any) {
  for (const k in target) {
    if (node[k] === void 0) {
      node[k] = target[k]
    }
    if (node[k] && typeof node[k] === 'object') {
      if (target[k] && typeof target[k] === 'object') {
        recoverJson(node[k], target[k])
      }
    }
  }
  return node
}

/** 补充新增的组件字段 */
export function componentRecover(node: AppComponent) {
  const recoverData = createComponentInstance(
    node.basicInfo.id as any,
    node.instanceID
  )

  recoverJson(node, recoverData)

  node.nodes.forEach(subNode => componentRecover(subNode))
  return node
}

/** 数据修复 */
export function dataRecover(data: AppData) {
  if (data.version && data.version === DATA_VERSION && DATA_VERSION !== '*') {
    return
  }

  data.version = DATA_VERSION

  data.pages.forEach(page => {
    page.nodeTree.forEach(node => componentRecover(node))
  })

  return data
}
