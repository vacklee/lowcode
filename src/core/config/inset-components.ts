import { Component, defineAsyncComponent } from 'vue'
import { AllComponentIds } from './components'
import { Constants } from './constant'

/**
 * 内置组件
 */
export const insetComponents: Record<AllComponentIds, Component> = {
  [Constants.BODY_NODE_ID]: {},

  CARD: {},
  DIALOG: {},
  GRID_LAYOUT: {},
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
  TOP_TABS: {}
}
