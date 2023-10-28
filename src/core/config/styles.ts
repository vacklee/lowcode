import { CSSProperties } from 'vue'
import { isColor } from '../utils/color'

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
  top: string
  left: string
  right: string
  bottom: string
}

// 坐标方向
export type CoordDirect = {
  x: string
  y: string
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
  color: Color
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
  url: string
  // 背景尺寸
  size: CoordDirect
  // 图片位置
  position: CoordDirect
  // 重复方式
  repeat: ImageBackgroundRepeat
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

// 样式转换
export function transformInsetStyle(styles: Partial<InsetStyle>) {
  const cssStyles: Partial<CSSProperties> = {}
  // 直接赋值
  const copyValue = <K extends InsetStyleKey>(
    key: K,
    validate?: (value: InsetStyle[K]) => boolean
  ) => {
    if (styles[key]) {
      if (validate && !validate(styles[key] as InsetStyle[K])) {
        return
      }
      Object.assign(cssStyles, { [key]: styles[key] })
    }
  }

  copyValue('fontSize')
  copyValue('color', isColor)
  copyValue('fontWeight')
  copyValue('lineHeight')
  copyValue('textAlign')

  return cssStyles
}
