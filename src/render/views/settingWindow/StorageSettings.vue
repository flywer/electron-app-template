<template>
  <div class="ml-6 h-full">
    <n-flex vertical>
      <n-text depth="3" class="text-xs">文件存储</n-text>
      <n-flex vertical class="pr-10" :size="'medium'">
        <SettingFolderItem
            :label="'应用文件夹'"
            :path="appResourcePath"/>
        <SettingFolderItem
            :label="'缓存文件夹'"
            :path="appCachePath"/>
        <SettingFolderItem
            :label="'日志文件夹'"
            :path="appLogPath"/>
      </n-flex>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import SettingFolderItem from "@render/views/settingWindow/components/SettingFolderItem.vue";
import {AppApi} from "@render/api/app/AppApi";
import {onMounted, ref} from "vue";

const appResourcePath = ref(null)
const appCachePath = ref(null)
const appLogPath = ref(null)

onMounted(async () => {
  appResourcePath.value = await AppApi.getAppResourcePath()
  appLogPath.value = await AppApi.getAppLogPath()
  appCachePath.value = await AppApi.getAppCachePath()
})

</script>

<style scoped lang="less">

</style>
