<template>
  <div class="flex items-center justify-center h-full text-5xl">
    <n-flex vertical>
      <n-text depth="3">Main</n-text>
      <n-button @click="test">产生一个通知</n-button>
    </n-flex>

  </div>
</template>

<script setup lang="ts">
import {useAppNotificationStore} from "@render/stores/appNotification";

const test = () => {
  useAppNotificationStore().addNotification({
    title: '测试title',
    content: '测试content',
    type: 'warning',
    duration: 2000
  })
}
</script>

<style>

</style>
