import { type Component } from 'vue'
import { Constants } from './constant'
import { BackgroundType, BorderType, FontWeight, TextAlign } from './styles'

export type SelectOption = {
  value: number | string
  label: string
  default?: boolean
  detailLabel?: string
  icon?: string | Component
  tooltip?: string
}

export type IconSelectOption = SelectOption & {
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
