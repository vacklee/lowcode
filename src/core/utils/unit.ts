export type Unit = 'px' | 'rem' | 'rpx' | '%'

export enum CellWidthEnum {
  FILL = 'fill',
  AUTO = 'auto'
}

export type CellSpan = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type CellWidth = CellWidthEnum | CellSpan | string

export function isPixel(s: unknown): s is string {
  return typeof s === 'string' && /^-?\d+(\.\d+)?(px|rpx|rem|%)$/.test(s)
}

export function parsePixel(s: unknown, defaultUnit = 'px') {
  const obj = {
    value: 0,
    unit: defaultUnit
  }

  if (isPixel(s)) {
    const [, numStr, , uniStr] = s.match(/^(-?\d+(\.\d+)?)(px|rem|rpx|%)$/)!
    obj.value = +numStr
    obj.unit = uniStr
  }

  return obj
}

export function computedCellWidth(
  cellwidth: CellWidth,
  prefix = '',
  format?: (s: string) => string
) {
  let flex = cellwidth === CellWidthEnum.FILL ? '1' : 'none'
  let width = 'auto'

  if (cellwidth === CellWidthEnum.FILL) {
    width = '0'
  } else if (isPixel(cellwidth)) {
    flex = 'none'
    width = cellwidth
    if (format) {
      width = format(width)
    }
  } else if (typeof cellwidth === 'number') {
    flex = 'none'
    width = `${100 * (cellwidth / 12)}%`
  }

  return {
    [`${prefix}flex`]: flex,
    [`${prefix}width`]: width
  }
}
