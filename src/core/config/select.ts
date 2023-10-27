import { type Component } from 'vue'
import { Constants } from './constant'

export type SelectOption = {
  value: number | string
  label: string
  default?: boolean
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
