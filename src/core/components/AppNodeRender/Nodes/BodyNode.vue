<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import SelectNode from './SelectNode.vue'
import SlotNode from './SlotNode.vue'
import { Constants } from 'core/config/constant'

const id = ref(Constants.BODY_NODE_ID)
const isEmpty = ref(true)
const bodyRef = ref<HTMLElement>(null!)
const slotRef = ref<InstanceType<typeof SlotNode>>(null!)

onMounted(() => {
  slotRef.value.dragEventProxy(bodyRef.value)
})
</script>

<template>
  <div ref="bodyRef" :class="$style.body">
    <div :class="[$style.body_inner, isEmpty && $style.empty]">
      <SelectNode :id="id" :is-empty="isEmpty">
        <SlotNode ref="slotRef" :is-empty="isEmpty" />
      </SelectNode>
    </div>
  </div>
</template>

<style lang="scss" module>
@import 'core/styles/nodes.scss';
</style>
