<template>
  <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
  >
    <naive-provider>
      <WindowBtn/>
      <HelloWorld title="Electron App Template"/>
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {zhCN, dateZhCN} from 'naive-ui';
import HelloWorld from './components/HelloWorld.vue'
import NaiveProvider from "@render/components/common/NaiveProvider.vue"
import WindowBtn from "@render/components/base/WindowBar.vue";
</script>

<style scoped>
.logo {
  width: 400px;
  border-radius: 1rem;
  box-shadow: 0 0 #0000, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>

<style>
* {
  font-family: v-sans v-mono;
}
</style>
