<template>
  <div class="ml-6 h-full">
    <n-flex vertical>
      <n-text depth="3" class="text-xs">开机与启动</n-text>
      <n-flex vertical class="pr-10" :size="'medium'">
        <SettingSwitchItem
            :setting-label="'开机自启动'"
            :setting-name="AppSettingsConstant.AUTO_START"/>
        <SettingSwitchItem
            :setting-label="'启用系统托盘'"
            :setting-name="AppSettingsConstant.ENABLE_TRAY"/>
      </n-flex>

      <n-text depth="3" class="text-xs mt-4">应用更新</n-text>
      <n-flex vertical class="pr-10" :size="'medium'">
        <SettingSwitchItem
            :setting-label="'启用自动更新'"
            :setting-name="AppSettingsConstant.AUTO_UPDATE"
            :disable="true"
        />
      </n-flex>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import SettingSwitchItem from "@render/views/settingWindow/components/SettingSwitchItem.vue";
import {AppSettingsConstant} from "@common/constants/app/AppSettingsConstant";
</script>

<style scoped lang="less">

</style>
