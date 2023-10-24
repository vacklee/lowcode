<script lang="ts" setup>
import { ref } from 'vue'
import { resetComponentGroups } from 'core/config/components'
import AppCIcon from '../AppCIcon.vue'
import AppComponentCard from './AppComponentCard.vue'

const activeNames = ref(resetComponentGroups.map(item => item.id))
</script>

<template>
  <el-collapse :class="$style.collapse" v-model="activeNames">
    <el-collapse-item
      v-for="item in resetComponentGroups"
      :key="item.id"
      :name="item.id"
      :title="item.title"
    >
      <template #title>
        <div :class="$style.title">
          <AppCIcon :name="item.icon" />
          <span>{{ item.title }}</span>
        </div>
      </template>

      <div :class="$style.content">
        <AppComponentCard v-for="cid in item.components" :key="cid" :id="cid" />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" module>
@import 'core/styles/collapse.scss';

.title {
  display: flex;
  align-items: center;
  gap: $spacing-mini;
}

.content {
  padding: $spacing-small;
  padding-top: calc($spacing-small / 2);
  display: grid;
  grid-template-columns: repeat(2, calc(50% - $spacing-small / 2));
  gap: $spacing-small;
}
</style>
