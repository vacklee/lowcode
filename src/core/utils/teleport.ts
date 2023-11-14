import { transformInsetStyle } from '../config/styles'
import { Expression, isExpression } from '../data/code'
import { AppComponent } from '../data/component'
import { kebabCase } from 'lodash'
import { genId } from './common'

export type TeleportNode = Record<string, unknown>

export function generatNode(
  appNode: AppComponent,
  expressions: Record<string, string> = {}
) {
  const compName = appNode.basicInfo.name
  if (!compName) return null

  const elementType = kebabCase(`App${compName}`)

  const flagExpression = (expression: Expression) => {
    const id = genId()
    expressions[id] = expression.content
    return id
  }

  const attrs: any = {}
  const compAttrs = { ...appNode.baseAttrs, ...appNode.heightAttrs }
  Object.entries(compAttrs).forEach(([key, val]) => {
    if (typeof val === 'string') {
      attrs[key] = val
      return
    }

    attrs[`:${key}`] = toRawValue(val, flagExpression)
  })

  const styles = transformInsetStyle(appNode.visualCss, {
    toPx: s => `${s}`
  })

  if (Object.keys(styles).length) {
    attrs[`:style`] = toRawValue(styles, flagExpression)
  }

  const node: TeleportNode = {
    elementType,
    attrs,
    children: appNode.nodes
      .map(sub => generatNode(sub, expressions)?.node)
      .filter(Boolean)
  }

  return { node, expressions }
}

function toRawValue(
  value: unknown,
  flagExpression: (expression: Expression) => string
): string {
  if (isExpression(value)) {
    return flagExpression(value)
  }

  if (Array.isArray(value)) {
    return `[${value.map(item => toRawValue(item, flagExpression)).join(', ')}]`
  }

  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .map(key => {
        const _key = /^[\dA-Za-z_]+$/.test(key) ? key : `'${key}'`
        return `${_key}: ${toRawValue(
          value[key as keyof typeof value],
          flagExpression
        )}`
      })
      .join(', ')}}`
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return `${value}`
}
