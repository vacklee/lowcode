import { computed, isRef, ref, Ref, watch } from 'vue'
import { getReturnValue, isExpression } from '../data/code'
import { debounce } from 'lodash'

export function useCode<T>(
  r: Ref<unknown> | (() => unknown),
  defaultValue?: any
) {
  const expression = isRef(r) ? r : computed(r)

  const resultPromise = computed(() => {
    if (isExpression(expression.value)) {
      return getReturnValue<T>(expression.value)
    }
    return Promise.resolve(expression.value ?? defaultValue)
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
    }, 20),
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
