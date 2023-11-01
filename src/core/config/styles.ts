import { CSSProperties } from 'vue'
import { isColor, toRGBColor } from '../utils/color'

// 颜色
export type Color = string

// 字重
export enum FontWeight {
  // 细
  LIGHTER = 'lighter',
  // 正常
  NORMAL = 'normal',
  // 粗
  BOLDER = 'bolder'
}

// 文字对齐
export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify'
}

// 四方向单位
export type FourDirect = {
  top?: string
  left?: string
  right?: string
  bottom?: string
}

// 坐标方向
export type CoordDirect = {
  x?: string
  y?: string
}

// 顶点方向
export type VertexDirect = {
  topLeft: string
  topRight: string
  bottomLeft: string
  bottomRight: string
}

// 边框类型
export enum BorderType {
  // 默认
  DEFAULT = 'default',
  // 无边框
  NONE = 'none',
  // 实线
  SOLID = 'solid',
  // 虚线
  DASHED = 'dashed'
}

// 边框
export type Border = {
  type: BorderType
  color: Color
  width: FourDirect
}

// 背景类型
export enum BackgroundType {
  // 默认
  DEFAULT = 'default',
  // 无背景
  NONE = 'none',
  // 颜色背景
  COLOR = 'color',
  // 图片背景
  IMAGE = 'image'
}

// 颜色背景
export type ColorBackground = {
  type: BackgroundType.COLOR
  color?: Color
}

// 背景图片重复方式
export enum ImageBackgroundRepeat {
  // 不重复
  NO_REPEAT = 'no-repeat',
  // 水平垂直重复
  REPEAT = 'repeat',
  // 水平重复
  REPEAT_X = 'repeat-x',
  // 垂直重复
  REPEAT_Y = 'repeat-y'
}

// 图片背景
export type ImageBackground = {
  type: BackgroundType.IMAGE
  // 图片地址
  url?: string
  // 背景尺寸
  size?: CoordDirect
  // 图片位置
  position?: CoordDirect
  // 重复方式
  repeat?: ImageBackgroundRepeat
}

// 背景
export type Background =
  | BackgroundType.DEFAULT
  | BackgroundType.NONE
  | ColorBackground
  | ImageBackground

// 阴影类型
export enum BoxShadowType {
  // 默认
  DEFAULT = 'default',
  // 无阴影
  NONE = 'none',
  // 外阴影
  OUTSIDE = 'outside'
}

// 外阴影
export type OutsideBoxShadow = {
  type: BoxShadowType.OUTSIDE
  x: string
  y: string
  // 阴影距离
  blur: string
  // 阴影扩展
  spread: string
  // 颜色
  color: Color
}

// 阴影
export type BoxShadow =
  | BoxShadowType.DEFAULT
  | BoxShadowType.NONE
  | OutsideBoxShadow

// 定位类型
export enum PositionType {
  // 默认
  DEFAULT = 'default',
  // 静态
  STATIC = 'static',
  // 相对
  RELATIVE = 'relative',
  // 绝对
  ABSOLUTE = 'absolute',
  // 固定
  FIXED = 'fixed'
}

// 定位
export type Position = {
  type: PositionType
  position: FourDirect
}

// 可视化配置CSS属性
export type InsetStyle = {
  // 字号
  fontSize: string
  // 字体颜色
  color: Color
  // 字重
  fontWeight: FontWeight
  // 行高
  lineHeight: string
  // 文字对齐
  textAlign: TextAlign
  // 宽
  width: string
  // 高
  height: string
  // 外边距
  margin: FourDirect
  // 内边距
  padding: FourDirect
  // 边框
  border: Border
  // 背景
  background: Background
  // 阴影
  boxShadow: BoxShadow
  // 圆角半径
  borderRadius: VertexDirect
  // 不透明度
  opacity: string
  // 定位
  position: Position
}

export type InsetStyleKey = keyof InsetStyle

// 判断四方向全相等
export const checkFourDirectAllEqual = (
  val: FourDirect
): val is Required<FourDirect> => {
  const { top, left, right, bottom } = val
  return top === left && left === right && right === bottom
}

// 背景转换
export function transformBackground(
  value: Background
): Partial<CSSStyleDeclaration> {
  if (value === BackgroundType.DEFAULT) {
    return {}
  }
  if (value === BackgroundType.NONE) {
    return {
      background: 'none'
    }
  }
  if (value.type === BackgroundType.COLOR) {
    return {
      backgroundColor: value.color
    }
  }

  const cssStyles: Partial<CSSStyleDeclaration> = {}
  if (value.url) {
    cssStyles.backgroundImage = `url("${value.url}")`
  }
  if (value.size) {
    cssStyles.backgroundSize = `${value.size.x} ${value.size.y}`
  }
  if (value.repeat) {
    cssStyles.backgroundRepeat = value.repeat
  }
  if (value.position) {
    cssStyles.backgroundPosition = `${value.position.x} ${value.position.y}`
  }

  return cssStyles
}

// 四方向转换
export function transformFourDirect(
  data: FourDirect,
  toPx: (pixel: unknown) => string,
  prefix = '',
  translate?: Partial<Record<keyof FourDirect, string>>
) {
  const css: Partial<CSSProperties> = {}
  Object.keys(data).forEach(_key => {
    const key = _key as keyof FourDirect
    const cssKey = `${prefix}${translate?.[key] || key}` as any
    if (data[key]) {
      css[cssKey] = toPx(data[key])
    }
  })
  return css
}

// 样式转换
export function transformInsetStyle(
  styles: Partial<InsetStyle>,
  opts: {
    toPx: (pixel: unknown) => string
  }
) {
  const cssStyles: Partial<CSSProperties> = {}

  // 直接赋值
  const copyValue = <K extends InsetStyleKey, T>(
    key: K,
    validate?: (value: InsetStyle[K]) => boolean,
    transform?: (value: InsetStyle[K]) => T
  ) => {
    if (styles[key]) {
      if (validate && !validate(styles[key] as InsetStyle[K])) {
        return
      }

      let val: any = styles[key]
      if (transform) {
        val = transform(val as InsetStyle[K])
      }
      Object.assign(cssStyles, { [key]: val })
    }
  }

  // 通用处理
  const handle = <K extends InsetStyleKey>(
    key: K,
    func: (
      val: InsetStyle[K],
      expose: (k: keyof CSSProperties, val: any) => void
    ) => Partial<CSSProperties> | void
  ) => {
    const styleVal = styles[key]
    if (!styleVal) return
    const _css: any = {}
    const _returnCss = func(styleVal, (k: keyof CSSProperties, val: any) => {
      _css[k] = val
    })

    Object.assign(cssStyles, _css, _returnCss)
  }

  copyValue('fontSize')
  copyValue('color', isColor)
  copyValue('fontWeight')
  copyValue('lineHeight')
  copyValue('textAlign')
  copyValue('width', void 0, opts.toPx)
  copyValue('height', void 0, opts.toPx)

  if (styles.margin) {
    Object.assign(
      cssStyles,
      transformFourDirect(styles.margin, opts.toPx, 'margin-')
    )
  }

  if (styles.padding) {
    Object.assign(
      cssStyles,
      transformFourDirect(styles.padding, opts.toPx, 'padding-')
    )
  }

  /** 边框 */
  handle('border', (border, expose) => {
    if (border.type === BorderType.DEFAULT) {
      return
    }

    if (border.type === BorderType.NONE) {
      expose('border', 'none')
      return
    }

    expose('border-style', border.type)

    if (isColor(border.color)) {
      expose('border-color', toRGBColor(border.color))
    }

    if (!border.width) {
      return
    }

    if (checkFourDirectAllEqual(border.width)) {
      expose('border-width', opts.toPx(border.width.top))
    } else {
      if (border.width.top) {
        expose('border-top-width', opts.toPx(border.width.top))
      }
      if (border.width.left) {
        expose('border-left-width', opts.toPx(border.width.left))
      }
      if (border.width.right) {
        expose('border-right-width', opts.toPx(border.width.right))
      }
      if (border.width.bottom) {
        expose('border-bottom-width', opts.toPx(border.width.bottom))
      }
    }
  })

  /** 背景 */
  handle('background', (background, expose) => {
    // 缺省
    if (background === BackgroundType.DEFAULT) {
      return
    }

    // 无背景
    if (background === BackgroundType.NONE) {
      expose('background', 'none')
      return
    }

    // 颜色背景
    if (background.type === BackgroundType.COLOR) {
      if (background.color) {
        expose('background-color', background.color)
      }
      return
    }

    // 图片背景
    // 地址
    if (background.url) {
      expose('background-image', `url("${background.url}")`)
    }
    // 尺寸
    if (background.size) {
      const { x, y } = background.size
      const value = [x, y].filter(Boolean).join(' ')
      if (value) {
        expose('background-size', value)
      }
    }
    // 位置
    if (background.position) {
      const { x, y } = background.position
      x && expose('background-position-x', x)
      y && expose('background-position-y', y)
    }
    // 重复方式
    if (background.repeat) {
      expose('background-repeat', background.repeat)
    }
  })

  return cssStyles
}
