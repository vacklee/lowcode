<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { ShortCutState, listens } from '../features/shortcut'
import { usePageNode } from '../hooks/use-page-node'

const $pageNode = usePageNode()

const state = computed<ShortCutState>(() => ({
  $pageNode
}))

const onKeydown = (payload: KeyboardEvent) => {
  if (payload.isComposing) return
  const keys = [payload.key]
  if (payload.altKey) {
    keys.unshift('Alt')
  }
  if (payload.shiftKey) {
    keys.unshift('Shift')
  }
  if (payload.ctrlKey) {
    keys.unshift('Control')
  }
  if (payload.metaKey) {
    keys.unshift('Meta')
  }

  const keyStr = [...new Set(keys)].join(' + ')
  const _listens = listens.filter(item => {
    if (!item.keys.some(k => k === '*' || k === keyStr)) {
      return false
    }

    if (item.filter) {
      return item.filter(state.value, payload)
    }
    return true
  })

  if (_listens.length) {
    payload.preventDefault()
    _listens.forEach(item => item.handle(state.value, payload))
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <slot />
</template>
