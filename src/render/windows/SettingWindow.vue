<template>
  <div id="window-bar" class="w-screen fixed top-0 left-0 h-9 z-40">
    <div class="absolute top-0 left-0 p-1.5 select-none">
      <n-flex class="items-center ml-1" :size="6">
        <n-text>设置</n-text>
      </n-flex>
    </div>

    <div id="window-button" class="absolute top-0 right-0 z-50 p-1.5">
      <n-button quaternary size="small" class="p-2" @click="WindowApi.windowClose()">
        <n-icon :size="16">
          <Dismiss48Regular/>
        </n-icon>
      </n-button>
    </div>
  </div>
  <div class="fixed top-10 left-0 right-1.5">
    <n-tabs
        :type="'line'"
        animated
        :placement="'left'"
        :style="{ height:'350px'}"
        class="select-none"
    >
      <n-tab-pane name="commonSettings" tab="通用设置">
        <CommonSettings/>
      </n-tab-pane>
      <n-tab-pane name="advancedSettings" tab="高级设置">
        <AdvancedSettings/>
      </n-tab-pane>
      <n-tab-pane name="storage" tab="存储空间">
        <StorageSettings/>
      </n-tab-pane>
      <n-tab-pane name="about" tab="关于">
        <AboutSettings/>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import {Dismiss48Regular} from "@vicons/fluent";
import {WindowApi} from "@render/api/app/WindowApi";
import CommonSettings from "@render/views/settingWindow/CommonSettings.vue";
import AdvancedSettings from "@render/views/settingWindow/AdvancedSettings.vue";
import StorageSettings from "@render/views/settingWindow/StorageSettings.vue";
import AboutSettings from "@render/views/settingWindow/AboutSettings.vue";
</script>

<style scoped lang="less">
#window-bar {
  -webkit-app-region: drag; /*窗口拖动*/
}

#window-button {
  -webkit-app-region: no-drag;
}
</style>
