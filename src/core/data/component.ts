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
  // 内嵌节点
  nodes: AppComponent[]
}

/** 创建组件 */
export function createAppComponent(basicInfo: AppComponentInfo): AppComponent {
  return {
    basicInfo,
    instanceID: '',
    nodes: []
  }
}
