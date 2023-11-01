import { AutoFormColumn } from '../components/AutoForm/types'
import { InsetStyle } from '../config/styles'

/**
 * 组件基础信息
 */
export type AppComponentInfo = {
  // 组件ID
  id: string
  // 组件图标
  icon: string
  // 组件标题
  title: string
}

/**
 * 组件数据
 */
export type AppComponent = {
  // 基础信息
  basicInfo: AppComponentInfo
  // 实例ID
  instanceID: string
  // 实例名称
  instanceName: string
  // 内嵌节点
  nodes: AppComponent[]
  // 基础属性
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  baseAttrs: Record<string, any>
  // 基础属性表单
  baseAttrsForm: AutoFormColumn[]
  // 高级属性
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heightAttrs: Record<string, any>
  // 高级属性表单
  heightAttrsForm: AutoFormColumn[]
  // 创建实例自定义逻辑
  onCreateInstance?: (node: AppComponent) => AppComponent
  // 插槽名称
  slot: string
  // 继承自
  extends: string[]
  // 可视化配置CSS
  visualCss: Partial<InsetStyle>
  // 是否可以删除
  deletable: boolean
}

/** 创建组件 */
export function createAppComponent(
  basicInfo: AppComponentInfo,
  opts?: Partial<AppComponent>
): AppComponent {
  return {
    basicInfo,
    instanceID: '',
    instanceName: '',
    baseAttrs: {},
    baseAttrsForm: [],
    heightAttrs: {},
    heightAttrsForm: [],
    nodes: [],
    slot: 'default',
    extends: [],
    visualCss: {},
    deletable: true,
    ...(opts || {})
  }
}
