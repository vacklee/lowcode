<script lang="ts" setup>
import { computed } from 'vue'
import { AppComponent } from '@/core/data/component'
import AutoForm from 'core/components/AutoForm/AutoForm.vue'
import { usePageNode } from 'core/hooks/use-page-node'

const props = defineProps<{
  node: AppComponent
  attrsKey: 'baseAttrs' | 'heightAttrs'
  columnKey: 'baseAttrsForm' | 'heightAttrsForm'
}>()

const { setNodeAttrs } = usePageNode()
const columns = computed(() => props.node[props.columnKey])

const model = computed(() => {
  const sourceModel = props.node[props.attrsKey]
  const target = {
    getValue: (key: string) => sourceModel[key],
    setValue: (key: string, value: unknown) => {
      setNodeAttrs(props.node.instanceID, props.attrsKey, key, value)
    }
  }

  return new Proxy(target, {
    get(_, p) {
      if (p === 'getValue') {
        return target.getValue
      }

      if (p === 'setValue') {
        return target.setValue
      }

      if (p in sourceModel && typeof p === 'string') {
        return target.getValue(p)
      }
    },
    set(_, p, newVal) {
      if (p in sourceModel && typeof p === 'string') {
        target.setValue(p, newVal)
        return true
      }
      return false
    }
  })
})
</script>

<template>
  <div :class="$style.box">
    <AutoForm
      :columns="columns"
      :model="model"
      :el-form-props="{
        labelPosition: 'top'
      }"
    />
  </div>
</template>

<style lang="scss" module>
.box {
  padding: $spacing-mini $spacing-small;
}
</style>
