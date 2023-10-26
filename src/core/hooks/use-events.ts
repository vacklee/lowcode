import { onBeforeUnmount } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomEventHandle = (...args: any) => any
type Func = CustomEventHandle

type CustomEventListen = {
  name: string
  handle: Func
  cancel: () => void
  once: boolean
}

export class CustomEvents {
  listens: CustomEventListen[] = []

  on(name: string, handle: Func, once = false) {
    const node: CustomEventListen = {
      name,
      handle,
      once,
      cancel: () => {
        const index = this.listens.indexOf(node)
        this.listens.splice(index, 1)
      }
    }

    this.listens.push(node)
    return node
  }

  once(name: string, handle: Func) {
    return this.on(name, handle, true)
  }

  off(name: string, handle?: Func) {
    const listens = this.listens.filter(item => {
      if (item.name !== name) return false
      if (handle && item.handle !== handle) return false
      return true
    })

    listens.forEach(item => item.cancel())
    return this
  }

  emit(name: string, params: unknown) {
    const listens = this.listens.filter(item => item.name === name).slice(0)
    listens.forEach(item => {
      item.handle(params)
      if (item.once) {
        item.cancel()
      }
    })
    return this
  }
}

export const innerEvents = new CustomEvents()

export function useEvents() {
  const nodes: CustomEventListen[] = []

  const on = (name: string, func: Func, once = false) => {
    nodes.push(innerEvents.on(name, func, once))
  }

  const once = (name: string, func: Func) => {
    nodes.push(innerEvents.once(name, func))
  }

  const emit = (name: string, params: unknown) => {
    innerEvents.emit(name, params)
  }

  onBeforeUnmount(() => {
    nodes.forEach(item => item.cancel())
  })

  return {
    nodes,
    on,
    once,
    emit
  }
}
