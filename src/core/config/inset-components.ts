import { Component, defineAsyncComponent } from 'vue'
import { AllComponentIds } from './components'
import { Constants } from './constant'

/**
 * 内置组件
 */
export const insetComponents: Record<AllComponentIds, Component> = {
  [Constants.BODY_NODE_ID]: {},

  // 卡片
  CARD: defineAsyncComponent(
    () => import('core/components/AppNodeRender/Insets/CardNode.vue')
  ),

  DIALOG: {},

  // 网格布局
  GRID_LAYOUT: defineAsyncComponent(
    () => import('core/components/AppNodeRender/Insets/GridLayoutNode.vue')
  ),

  // 网格布局 - 行
  GRID_LAYOUT_ROW: defineAsyncComponent(
    () => import('core/components/AppNodeRender/Insets/GridLayoutRowNode.vue')
  ),

  // 网格布局 - 列
  GRID_LAYOUT_COL: defineAsyncComponent(
    () => import('core/components/AppNodeRender/Insets/GridLayoutColNode.vue')
  ),

  GRID_NAVS: {},
  LAYOUT: {},
  MENU_NAVS: {},

  // 普通容器
  NOMAL_CONTAINER: defineAsyncComponent(
    () => import('core/components/AppNodeRender/Insets/NomalContainerNode.vue')
  ),

  SCROLL_CONTAINER: {},
  SIDE_TABS: {},
  SWIPER_CONTAINER: {},
  TAB_BAR: {},
  TOP_NAVS: {},
  TOP_TABS: {},

  // 文本
  TEXT: defineAsyncComponent(
    () => import('core/components/AppNodeRender/Insets/TextNode.vue')
  )
}
