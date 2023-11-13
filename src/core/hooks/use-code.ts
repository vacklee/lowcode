import { computed, ref, Ref, watch } from 'vue'
import { getReturnValue, isExpression } from '../data/code'

export function useCode<T>(expression: Ref<unknown>, defaultValue?: any) {
  const resultPromise = computed(() => {
    if (isExpression(expression.value)) {
      return getReturnValue<T>(expression.value)
    }
    return Promise.resolve(defaultValue)
  })

  const result = ref(defaultValue as T)

  watch(
    resultPromise,
    () => {
      resultPromise.value.then(value => {
        result.value = value
      })
    },
    {
      immediate: true
    }
  )

  return {
    result,
    resultPromise
  }
}
