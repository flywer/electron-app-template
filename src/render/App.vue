<template>
  <n-config-provider
      class="h-full"
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme="theme"
  >
    <n-global-style/>
    <naive-provider>
      <router-view/>
    </naive-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {zhCN, dateZhCN, darkTheme} from 'naive-ui';
import {useIpc} from "@render/plugins";
import NaiveProvider from "@render/components/common/NaiveProvider.vue"
import {onMounted, ref} from 'vue'
import {AppSettingsApi} from "@render/api/AppSettingsApi";
import {AppSettingsConstant} from "@common/constants/AppSettingsConstant";
import {AppSettingsApiChannel} from "@common/channels/AppSettingsApiChannel";

const ipc = useIpc()

const theme = ref<null | typeof darkTheme>(null)

const onThemeModeUpdate = async () => {
  const themeMode = await AppSettingsApi.getAppSettingByName(AppSettingsConstant.THEME_MODE)
  if (themeMode === null || themeMode.settingValue === 'light') {
    theme.value = null
  } else {
    theme.value = darkTheme
  }
}

onMounted(async () => {
  await onThemeModeUpdate()
})

ipc.on(AppSettingsApiChannel.THEME_MODE_UPDATED, async () => {
  await onThemeModeUpdate()
})

</script>
