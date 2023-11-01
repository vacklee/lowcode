import { type Component } from 'vue'
import { Constants } from './constant'
import {
  BackgroundType,
  BorderType,
  FontWeight,
  ImageBackgroundRepeat,
  TextAlign
} from './styles'

export type SelectOption<
  T extends number | string = number | string,
  D = any
> = {
  value: T
  label: string
  default?: boolean
  detailLabel?: string
  icon?: string | Component
  tooltip?: string
  data?: D
}

export type IconSelectOption<
  T extends number | string = number | string,
  D = any
> = SelectOption<T, D> & {
  icon: string | Component
}

/** 间距 */
export const spacingOptions: SelectOption[] = [
  { value: Constants.CSS_INHERIT, label: 'inherit' },
  { value: '0px', label: '0px(无)' },
  { value: '8px', label: '8px(超小)' },
  { value: '16px', label: '16px(超小)' },
  { value: '24px', label: '24px(小)' },
  { value: '32px', label: '32px(中)' },
  { value: '48px', label: '48px(大)' },
  { value: '60px', label: '60px(超大)' },
  { value: '80px', label: '80px(超大)' },
  { value: '100px', label: '100px(超大)' },
  { value: '128px', label: '128px(超大)' }
]

/** 垂直对齐 */
export const verticalAligns: IconSelectOption[] = [
  {
    value: Constants.CSS_FLEX_START,
    label: '上对齐',
    icon: 't-icon-style-align-top'
  },
  {
    value: Constants.CSS_CENTER,
    label: '垂直居中',
    icon: 't-icon-style-align-vertical-center'
  },
  {
    value: Constants.CSS_FLEX_END,
    label: '下对齐',
    icon: 't-icon-style-align-bottom'
  }
]

/** 字重 */
export const fontWeightOptions: SelectOption[] = [
  { value: FontWeight.LIGHTER, label: '细' },
  { value: FontWeight.NORMAL, label: '正常' },
  { value: FontWeight.BOLDER, label: '粗' }
]

/** 文字对齐 */
export const textAlignOptions: IconSelectOption[] = [
  {
    value: TextAlign.LEFT,
    label: '左对齐',
    icon: 't-icon-style-align-left'
  },
  {
    value: TextAlign.CENTER,
    label: '居中对齐',
    icon: 't-icon-style-text-align-center'
  },
  {
    value: TextAlign.RIGHT,
    label: '右对齐',
    icon: 't-icon-style-align-right'
  },
  {
    value: TextAlign.JUSTIFY,
    label: '两端对齐',
    icon: 't-icon-style-text-align-spacing'
  }
]

/** 边框类型 */
export const borderTypes: SelectOption[] = [
  {
    value: BorderType.DEFAULT,
    label: '默认',
    detailLabel: '默认边框',
    tooltip: '默认边框（缺省）'
  },
  { value: BorderType.NONE, label: '无边框', tooltip: '无边框（none）' },
  {
    value: BorderType.SOLID,
    label: '实线',
    detailLabel: '实线框',
    tooltip: '实线边框（solid）'
  },
  {
    value: BorderType.DASHED,
    label: '虚线',
    detailLabel: '虚线框',
    tooltip: '虚线边框（dashed）'
  }
]

/** 背景类型 */
export const backgroundTypes: SelectOption[] = [
  {
    value: BackgroundType.DEFAULT,
    label: '默认',
    detailLabel: '默认背景',
    tooltip: '默认背景（缺省）'
  },
  {
    value: BackgroundType.NONE,
    label: '无背景',
    tooltip: 'background: none'
  },
  {
    value: BackgroundType.COLOR,
    label: '颜色背景',
    tooltip: 'background: color'
  },
  {
    value: BackgroundType.IMAGE,
    label: '图片背景',
    tooltip: 'background: image'
  }
]

/** 背景尺寸 */
export const backgroundSizeOptions: SelectOption[] = [
  {
    value: 'auto',
    label: 'auto',
    tooltip: '原图尺寸'
  },
  {
    value: '100% auto',
    label: '100% auto',
    tooltip: '宽度拉伸，高度自适应'
  },
  {
    value: 'auto 100%',
    label: 'auto 100%',
    tooltip: '宽度自适应，高度拉伸'
  },
  {
    value: '100% 100%',
    label: '100% 100%',
    tooltip: '宽度高度均拉伸'
  }
]

/** 图片位置 */
export const imagePositionOptions: IconSelectOption<string>[] = [
  { value: '0% 0%', label: '左上', icon: 'position-left-top' },
  { value: '50% 0%', label: '中上', icon: 'position-center-top' },
  { value: '100% 0%', label: '右上', icon: 'position-right-top' },
  { value: '0% 50%', label: '左中', icon: 'position-left-center' },
  { value: '50% 50%', label: '中间', icon: 'position-center' },
  { value: '100% 50%', label: '右中', icon: 'position-right-center' },
  { value: '0% 100%', label: '左下', icon: 'position-left-bottom' },
  { value: '50% 100%', label: '中下', icon: 'position-center-bottom' },
  { value: '100% 100%', label: '右下', icon: 'position-right-bottom' }
]

/** 背景重复方式 */
export const backgroundRepeatOptions: SelectOption<ImageBackgroundRepeat>[] = [
  { value: ImageBackgroundRepeat.NO_REPEAT, label: '不重复' },
  { value: ImageBackgroundRepeat.REPEAT_X, label: '水平重复' },
  { value: ImageBackgroundRepeat.REPEAT_Y, label: '垂直重复' },
  { value: ImageBackgroundRepeat.REPEAT, label: '水平垂直重复' }
]

/** 文本格式 */
export enum TextFormat {
  // 正文默认
  CONTENT_DEFAULT = 'CONTENT_DEFAULT',
  // 正文小
  CONTENT_SMALL = 'CONTENT_SMALL',
  // 正文中
  CONTENT_MIDDLE = 'CONTENT_MIDDLE',
  // 正文大
  CONTENT_LARGE = 'CONTENT_LARGE',

  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
  H7 = 'H7',
  H8 = 'H8',
  H9 = 'H9'
}

export const textFormatOptions: SelectOption<TextFormat, string>[] = [
  { value: TextFormat.CONTENT_DEFAULT, label: '正文(默认)', data: 'p' },
  { value: TextFormat.CONTENT_SMALL, label: '正文(小)', data: 'p' },
  { value: TextFormat.CONTENT_MIDDLE, label: '正文(中)', data: 'p' },
  { value: TextFormat.CONTENT_LARGE, label: '正文(大)', data: 'p' },
  { value: TextFormat.H1, label: '标题 H1', data: 'h1' },
  { value: TextFormat.H2, label: '标题 H2', data: 'h2' },
  { value: TextFormat.H3, label: '标题 H3', data: 'h3' },
  { value: TextFormat.H4, label: '标题 H4', data: 'h4' },
  { value: TextFormat.H5, label: '标题 H5', data: 'h5' },
  { value: TextFormat.H6, label: '标题 H6', data: 'h6' },
  { value: TextFormat.H7, label: '标题 H7', data: 'h6' },
  { value: TextFormat.H8, label: '标题 H8', data: 'h6' },
  { value: TextFormat.H9, label: '标题 H9', data: 'h6' }
]
