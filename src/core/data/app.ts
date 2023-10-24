import { getCanvasConfigs } from 'core/config/canvas'
import { AppPlatform } from 'core/config/enum'

export { AppPlatform }

// 画布属性
export type CanvasAttrs = {
  // 配置名称
  name: string
  // 宽
  width: number
  // 高
  height: number
  // 缩放
  scale: number
}

// 数据
export type AppState = {
  // 首页
  indexPage: string
  // 当前选择的页面
  currentPage: string
  // 当前预览平台
  platform: AppPlatform
  // 当前画布属性
  canvasAttrs: CanvasAttrs
  // 当前选中的节点ID
  currentSelectNodeId: string
}

// 分组
export type Group = {
  // 分组ID
  id: string
  // 分组名称
  title: string
}

// 页面
export type AppPage = {
  // 页面ID
  id: string
  // 分组ID
  groupdId: string
  // 页面标题
  title: string
  // 页面节点树
  nodeTree: AppNode[]
}

// 页面节点
export type AppNode = {
  // 节点类型
  type: string
  // 节点名称
  name: string
  // 子节点
  subNodes?: AppNode[]
}

// 应用基础信息
export type AppBasicInfo = {
  // 应用名称
  name: string
  // 应用图标
  iconURL: string
  // 应用favicon图标
  faviconURL: string
  // 应用描述
  description: string
}

// 应用数据
export type AppData = {
  // 应用基础信息
  basicInfo: AppBasicInfo
  // 页面分组
  pageGroups: Group[]
  // 页面
  pages: AppPage[]
  // 数据
  state: AppState
}

export default function createAppData(): AppData {
  return {
    basicInfo: {
      name: '未命名应用',
      iconURL: '',
      faviconURL: '',
      description: ''
    },
    pageGroups: [],
    pages: [],
    state: {
      indexPage: '',
      currentPage: '',
      platform: AppPlatform.H5,
      canvasAttrs: {
        name: getCanvasConfigs(AppPlatform.H5)[0]?.name || '',
        width: 0,
        height: 0,
        scale: 1
      },
      currentSelectNodeId: ''
    }
  }
}
