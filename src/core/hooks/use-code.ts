import { computed, ref, Ref, watch } from 'vue'
import { getReturnValue, isExpression } from '../data/code'
import { debounce } from 'lodash'

export function useCode<T>(expression: Ref<unknown>, defaultValue?: any) {
  const resultPromise = computed(() => {
    if (isExpression(expression.value)) {
      return getReturnValue<T>(expression.value)
    }
    return Promise.resolve(defaultValue)
  })

  const result = ref(defaultValue as T)
  const error = ref<Error | null>(null)

  watch(
    resultPromise,
    debounce(() => {
      resultPromise.value
        .then(value => {
          result.value = value ?? defaultValue
          error.value = null
        })
        .catch(err => {
          error.value = err
        })
    }, 500),
    {
      immediate: true
    }
  )

  return {
    error,
    result,
    resultPromise
  }
}
