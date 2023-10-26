import { Component, defineAsyncComponent } from 'vue'
import { FormItemProps, ElSwitch } from 'element-plus'
import { PropsOf } from '@/core/hooks/use-dialog'

export enum AutoFromControlsEnum {
  BoolSwitch = 'BoolSwitch',
  FourDirectBtn = 'FourDirectBtn'
}

export type AutoFormControl<T extends Component = Component> = {
  component: T
  componentProps?: Partial<PropsOf<T>>
}

const _ = <T extends Component>(opts: AutoFormControl<T>) => opts
export const AutoFromControls: Record<AutoFromControlsEnum, AutoFormControl> = {
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
  })
}

export type AutoFormColumn = {
  // 数据标识
  name: string
  // 标题
  label: string
  // 描述
  description: string
  // 类型
  type: AutoFromControlsEnum
  // 其他配置
  elFormItemProps?: Partial<FormItemProps>
}

export function autoFormColumn(
  type: AutoFromControlsEnum,
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
