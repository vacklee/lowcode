import colorString from 'color-string'
import colorConvert from 'color-convert'

/** 是否符合颜色格式 */
export function isColor(s: unknown): s is string {
  if (typeof s !== 'string') return false
  const color = colorString.get(s)
  return !!color
}

/** 颜色转rgb */
export function toRGBColor(s: unknown) {
  if (!isColor(s)) return ''
  const model = colorString.get(s)!
  const rgbData =
    model.model === 'rgb'
      ? model.value
      : colorConvert[model.model].rgb(model.value as any)
  return colorString.to.rgb(rgbData)
}
