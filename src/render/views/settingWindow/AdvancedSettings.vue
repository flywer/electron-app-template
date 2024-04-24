<template>
  <div class="ml-6 h-full">
    <n-flex vertical>
      <n-text depth="3" class="text-xs">画面渲染</n-text>
      <n-flex vertical class="pr-10" :size="'medium'">
        <SettingSwitchItem
            :setting-label="'开启硬件加速'"
            :setting-name="AppSettingsConstant.HARDWARE_ACCELERATION"/>
      </n-flex>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import {AppSettingsConstant} from "@common/constants/app/AppSettingsConstant";
import SettingSwitchItem from "@render/views/settingWindow/components/SettingSwitchItem.vue";
</script>

<style scoped lang="less">

</style>
