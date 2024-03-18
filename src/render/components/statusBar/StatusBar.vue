<template>
  <div class="w-screen fixed bottom-0 left-0 h-6 z-40">
    <n-flex justify="end" :size="0" class="h-full pl-2 pr-2">
      <NotificationManager/>
    </n-flex>
    <n-divider class="fixed bottom-6 left-0 right-0" style="margin: 0"/>
  </div>
</template>

<script setup lang="ts">
import NotificationManager from "@render/components/statusBar/NotificationManager.vue";
</script>

<style scoped lang="less">

</style>
