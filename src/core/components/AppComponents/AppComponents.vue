<script lang="ts" setup>
import { ref } from 'vue'
import AppResetComponents from './AppResetComponents.vue'

const activeNames = ref(['reset'])
</script>

<template>
  <el-collapse :class="$style.collapse" v-model="activeNames">
    <el-collapse-item name="reset" title="内置组件库">
      <AppResetComponents />
    </el-collapse-item>
  </el-collapse>
</template>

<style lang="scss" module>
@import 'core/styles/collapse.scss';
</style>
