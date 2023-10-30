import { nextTick, onMounted, onUnmounted, ref } from 'vue'

export type CommonSearchNext<T, O> = (
  limit: number,
  startId: string,
  opts?: O
) => Promise<{
  result: T[]
  nextId: string
}>

export function useSearchNext<T, O>(
  searchNext: CommonSearchNext<T, O>,
  limit: number,
  getParentWrap: () => HTMLElement,
  getSearchOptions?: () => O
) {
  const nextId = ref('')
  const data = ref<T[]>([])
  const loading = ref(false)
  const initLoading = ref(true)
  const loadEnd = ref(false)

  let _elCache: HTMLElement | null = null
  const _getWrap = () => {
    if (!_elCache) {
      _elCache = getParentWrap()
    }
    return _elCache
  }

  const loadNext = async (opts = getSearchOptions?.()) => {
    if (loadEnd.value) return
    if (loading.value) return
    loading.value = true
    const res = await searchNext(limit, nextId.value, opts)
    data.value.push(...(res.result as typeof data.value))
    nextId.value = res.nextId
    loading.value = false
    if (!res.nextId) {
      loadEnd.value = true
    }
  }

  const initLoad = async () => {
    initLoading.value = true

    const wrapEl = _getWrap()
    while (true) {
      await loadNext()
      await nextTick()
      if (loadEnd.value || wrapEl.scrollHeight > wrapEl.offsetHeight) {
        break
      }
    }
    initLoading.value = false
  }

  const _onScroll = () => {
    const { scrollTop, scrollHeight, offsetHeight } = _getWrap()
    if (scrollTop + offsetHeight === scrollHeight) {
      loadNext()
    }
  }

  onMounted(() => {
    const wrapEl = _getWrap()
    wrapEl.addEventListener('scroll', _onScroll)
  })

  onUnmounted(() => {
    const wrapEl = _getWrap()
    wrapEl.removeEventListener('scroll', _onScroll)
  })

  /** 重置 */
  const resetStates = () => {
    nextId.value = ''
    data.value = []
    loading.value = false
    initLoading.value = false
    loadEnd.value = false
  }

  return { nextId, data, loadNext, loading, initLoad, initLoading, resetStates }
}
