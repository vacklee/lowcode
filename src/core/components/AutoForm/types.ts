import { Component } from 'vue'
import { FormItemProps, ElSwitch } from 'element-plus'
import { PropsOf } from '@/core/hooks/use-dialog'
import FourDirectBtnVue from './Controls/FourDirectBtn.vue'
import CellWidthVue from './Controls/CellWidth.vue'
import CellWidthItemVue from './Controls/CellWidthItem.vue'
import VDirectBtnVue from './Controls/VDirectBtn.vue'
import NumberSelectVue from './Controls/NumberSelect.vue'
import SpacingSelectVue from './Controls/SpacingSelect.vue'
import CommonIconSelectVue from './Controls/CommonIconSelect.vue'

export enum AutoFromControlsEnum {
  // 开关
  BoolSwitch = 'BoolSwitch',
  // 四方向按钮
  FourDirectBtn = 'FourDirectBtn',
  // 列宽调节器
  CellWidth = 'CellWidth',
  // 列宽调节器单个
  CellWidthItem = 'CellWidthItem',
  // 垂直两方向按钮
  VDirectBtn = 'VDirectBtn',
  // 数字选择器
  NumberSelect = 'NumberSelect',
  // 间距选择器
  SpacingSelect = 'SpacingSelect',
  // 图标选择器
  IconSelect = 'CommonIconSelect'
}

export type AutoFormControl<T extends Component = Component> = {
  component: T
  componentProps?: Partial<PropsOf<T>>
}

const _ =
  <T extends Component>(opts: AutoFormControl<T>) =>
  (props?: Partial<PropsOf<T>>) =>
    ({
      ...opts,
      componentProps: {
        ...(opts.componentProps || {}),
        ...(props || {})
      }
    }) as AutoFormControl<T>

export const AutoFromControls = {
  // 开关
  [AutoFromControlsEnum.BoolSwitch]: _({
    component: ElSwitch,
    componentProps: {
      size: 'small'
    }
  }),

  // 四方向按钮
  [AutoFromControlsEnum.FourDirectBtn]: _({
    component: FourDirectBtnVue,
    componentProps: {
      topText: '向上添加行',
      leftText: '向左添加列',
      rightText: '向右添加列',
      bottomText: '向下添加行'
    }
  }),

  // 列宽调节器
  [AutoFromControlsEnum.CellWidth]: _({
    component: CellWidthVue
  }),

  // 列宽调节器单个
  [AutoFromControlsEnum.CellWidthItem]: _({
    component: CellWidthItemVue
  }),

  // 垂直两方向按钮
  [AutoFromControlsEnum.VDirectBtn]: _({
    component: VDirectBtnVue
  }),

  // 数字选择器
  [AutoFromControlsEnum.NumberSelect]: _({
    component: NumberSelectVue
  }),

  // 间距选择器
  [AutoFromControlsEnum.SpacingSelect]: _({
    component: SpacingSelectVue
  }),

  // 图标选择器
  [AutoFromControlsEnum.IconSelect]: _({
    component: CommonIconSelectVue
  })
}

export type AutoFormControlRaws = typeof AutoFromControls
export type AutoFormControlType = keyof AutoFormControlRaws
export type AutoFormControlItem<K extends AutoFormControlType> =
  AutoFormControlRaws[K]
export type AutoFormControlComponent<K extends AutoFormControlType> =
  ReturnType<AutoFormControlItem<K>> extends { component: infer P }
    ? P extends Component
      ? P
      : never
    : never

export type AutoFormColumn<T extends AutoFormControlType = any> = {
  // 数据标识
  name: string
  // 标题
  label: string
  // 描述
  description: string
  // 类型
  type: T
  // 其他配置
  elFormItemProps?: Partial<FormItemProps>
  // 控件配置
  controlProps?: Partial<PropsOf<AutoFormControlComponent<T>>>
}

export function autoFormColumn<T extends AutoFormControlType>(
  type: T,
  name: string,
  label: string,
  description = '',
  others?: Partial<AutoFormColumn<T>>
): AutoFormColumn<T> {
  return {
    type,
    name,
    label,
    description,
    ...(others || {})
  }
}
