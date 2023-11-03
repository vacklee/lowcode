import { transformInsetStyle } from '../config/styles'
import { AppComponent } from '../data/component'
import { kebabCase } from 'lodash'

export type TeleportNode = Record<string, unknown>

export function generatNode(appNode: AppComponent) {
  const compName = appNode.basicInfo.name
  if (!compName) return null

  const elementType = kebabCase(`App${compName}`)

  const attrs: any = {}
  const compAttrs = { ...appNode.baseAttrs, ...appNode.heightAttrs }
  Object.entries(compAttrs).forEach(([key, val]) => {
    if (typeof val === 'string') {
      attrs[key] = val
      return
    }

    attrs[`:${key}`] = toRawValue(val)
  })

  const styles = transformInsetStyle(appNode.visualCss, {
    toPx: s => `${s}`
  })

  if (Object.keys(styles).length) {
    attrs[`:style`] = toRawValue(styles)
  }

  const node: TeleportNode = {
    elementType,
    attrs,
    children: appNode.nodes.map(sub => generatNode(sub)).filter(Boolean)
  }

  return node
}

function toRawValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(item => toRawValue(item)).join(', ')}]`
  }

  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .map(key => {
        const _key = /[\dA-Za-z_]+/.test(key) ? key : `'${key}'`
        return `${_key}: ${toRawValue(value[key as keyof typeof value])}`
      })
      .join(', ')}}`
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return `${value}`
}
