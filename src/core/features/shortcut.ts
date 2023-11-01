import { usePageNode } from '../hooks/use-page-node'

export type ShortCutState = {
  $pageNode: ReturnType<typeof usePageNode>
}

export type ShortCutListenHandle = (
  state: ShortCutState,
  payload: KeyboardEvent
) => unknown

export type ShortCutListenOptions = {
  keys: string[]
  filter?: (state: ShortCutState) => boolean
  handle: ShortCutListenHandle
}

export const listens: ShortCutListenOptions[] = []

export function registListen(
  keys: string[],
  opts: Omit<ShortCutListenOptions, 'keys'>
) {
  listens.push({ keys, ...opts })
}

/** 删除选中节点 */
registListen(['Backspace', 'Delete', 'Meta + Backspace'], {
  filter(state) {
    const { currentNode } = state.$pageNode
    return !!currentNode.value?.deletable
  },
  handle(state) {
    const { currentNode, deleteNode } = state.$pageNode
    deleteNode(currentNode.value!.instanceID)
  }
})
