<script lang="ts" setup>
import { computed } from 'vue'
import { Expression } from '@/core/data/code'
import { useCode } from '@/core/hooks/use-code'
import { getTypeOf } from '@/core/utils/code'

const props = defineProps<{
  expression?: Expression
}>()

const expression = computed(() => props.expression)
const { result, error } = useCode(expression, '')

const resultParse = computed(() => {
  if (error.value) return null
  const type = getTypeOf(result.value)
  const content = JSON.stringify(result.value, null, 4)
  return { type, content }
})
</script>

<template>
  <div :class="$style.panel">
    <el-alert
      v-if="error"
      type="error"
      :show-icon="true"
      :closable="false"
      :title="error.message"
    />

    <div :class="$style.result" v-if="resultParse">
      <div>当前运行结果：({{ resultParse.type }})</div>
      <pre>{{ resultParse.content }}</pre>
    </div>
  </div>
</template>

<style lang="scss" module>
.panel {
  padding: $spacing-small;
  font-size: $font-size-base;
}
</style>
