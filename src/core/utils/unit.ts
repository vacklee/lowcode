export type CellSpan = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type CellWidth = 'fill' | 'auto' | CellSpan | string

export function computedCellWidth(cellwidth: CellWidth, prefix = '') {
  const flex = cellwidth === 'fill' ? '1' : 'auto'
  let width = 'auto'

  if (cellwidth === 'fill') {
    width = '0'
  } else if (/^\d+px$/.test(cellwidth)) {
    width = cellwidth
  } else if (typeof cellwidth === 'number') {
    width = `${100 * (cellwidth / 12)}%`
  }

  return {
    [`${prefix}flex`]: flex,
    [`${prefix}width`]: width
  }
}
