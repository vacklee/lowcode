<script lang="ts" setup>
import { AppComponent } from '@/core/data/component'
import { insetComponents } from '@/core/config/inset-components'
import { AllComponentIds } from '@/core/config/components'

withDefaults(
  defineProps<{
    nodes?: AppComponent[]
  }>(),
  {
    nodes: () => []
  }
)

const Comp = (node: AppComponent) => {
  const InsetComponent = insetComponents[node.basicInfo.id as AllComponentIds]
  if (InsetComponent) {
    return InsetComponent
  }
}
</script>

<template>
  <template v-for="item in nodes">
    <component
      :is="Comp(item)"
      :key="item.instanceID"
      :node="item"
      v-if="Comp(item)"
    />
  </template>
</template>
