import { Component, defineAsyncComponent } from 'vue'
import { FormItemProps, ElSwitch } from 'element-plus'
import { PropsOf } from '@/core/hooks/use-dialog'

export enum AutoFromControlsEnum {
  // 开关
  BoolSwitch = 'BoolSwitch',
  // 四方向按钮
  FourDirectBtn = 'FourDirectBtn',
  // 列宽调节器
  CellWidth = 'CellWidth',
  // 列宽调节器单个
  CellWidthItem = 'CellWidthItem'
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
    component: defineAsyncComponent(
      () => import('./Controls/FourDirectBtn.vue')
    ),
    componentProps: {
      topText: '向上添加行',
      leftText: '向左添加列',
      rightText: '向右添加列',
      bottomText: '向下添加行'
    }
  }),

  // 列宽调节器
  [AutoFromControlsEnum.CellWidth]: _({
    component: defineAsyncComponent(() => import('./Controls/CellWidth.vue'))
  }),

  // 列宽调节器单个
  [AutoFromControlsEnum.CellWidthItem]: _({
    component: defineAsyncComponent(
      () => import('./Controls/CellWidthItem.vue')
    )
  })
}

export type AutoFormControlType = keyof typeof AutoFromControls

export type AutoFormColumn = {
  // 数据标识
  name: string
  // 标题
  label: string
  // 描述
  description: string
  // 类型
  type: AutoFormControlType
  // 其他配置
  elFormItemProps?: Partial<FormItemProps>
  // 控件配置
  controlProps?: Record<string, unknown>
}

export function autoFormColumn(
  type: AutoFormControlType,
  name: string,
  label: string,
  description = '',
  others?: Partial<AutoFormColumn>
): AutoFormColumn {
  return {
    type,
    name,
    label,
    description,
    ...(others || {})
  }
}
