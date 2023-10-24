<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import SelectNode from './SelectNode.vue'
import SlotNode from './SlotNode.vue'
import { Constants } from 'core/config/constant'
import AppNodeEmpty from '../AppNodeEmpty.vue'

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
    <AppNodeEmpty v-if="isEmpty" />
    <div :class="[$style.body_inner, isEmpty && $style.empty]">
      <SelectNode :id="id" :is-empty="isEmpty">
        <SlotNode ref="slotRef" :is-empty="isEmpty" />
      </SelectNode>
    </div>
  </div>
</template>

<style lang="scss" module>
.body {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;

  &_inner {
    position: relative;
    &.empty {
      height: 100%;
    }
  }
}
</style>
