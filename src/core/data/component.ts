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
  // 创建实例自定义逻辑
  onCreateInstance?: (node: AppComponent) => AppComponent
  // 插槽名称
  slot: string
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
    nodes: [],
    slot: 'default',
    ...(opts || {})
  }
}
