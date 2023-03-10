<template>
  <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
  >
    <naive-provider>
      <WindowBtn/>
      <MainLayout/>
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {zhCN, dateZhCN} from 'naive-ui';
import NaiveProvider from "@render/components/common/NaiveProvider.vue"
import WindowBtn from "@render/components/base/WindowBar.vue";
import MainLayout from "@render/components/base/MainLayout.vue";
</script>

<style scoped>

</style>

<style>
* {
  font-family: v-sans v-mono;
}
</style>
