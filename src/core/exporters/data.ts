import { AppData, AppPage } from '../data/app'
import { createBodyNode } from '../hooks/use-page-node'
import { upperCamelCase } from '../utils/common'
import { generatNode } from '../utils/teleport'

export async function createRenderData(appData: AppData) {
  return {
    $appData: appData,
    $pages: appData.pages.map(page => createPageData(page))
  }
}

function createPageData(page: AppPage) {
  const pageId = page.id
  const groupId = page.groupdId
  const pageName = upperCamelCase(pageId)
  const groupName = upperCamelCase(groupId)
  const outputPath = [groupName, pageName, pageName].filter(Boolean).join('/')
  const node = generatNode(createBodyNode(page))!

  return {
    $: page,
    pageId,
    pageName,
    groupId,
    groupName,
    outputPath,
    node
  }
}
