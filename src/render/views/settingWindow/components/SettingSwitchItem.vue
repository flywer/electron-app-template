<template>
  <div>
    <div class="float-left">
      {{ settingLabel }}
    </div>
    <div class="float-right">
      <n-switch
          v-model:value="_settingValue"
          :rubber-band="false"
          :disabled="disable"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {AppSettingsApi} from "@render/api/app/AppSettingsApi";

const props = defineProps({
  settingLabel: {
    type: String,
    required: true
  },
  settingName: {
    type: String,
    required: true
  },
  disable: {
    type: Boolean,
    required: false,
  }
})

const _settingValue = ref(false)

watch(_settingValue, (newValue) => {
  if (newValue) {
    AppSettingsApi.setAppSettingByName(props.settingName, 'true')
  } else {
    AppSettingsApi.setAppSettingByName(props.settingName, 'false')
  }
})

onMounted(async () => {
  _settingValue.value = await parseToBooleanBySettingName(props.settingName)
})

const parseToBooleanBySettingName = async (settingName: string) => {
  let appSetting = await AppSettingsApi.getAppSettingByName(settingName);
  if (appSetting) {
    return appSetting.settingValue == 'true';
  } else {
    return false
  }
}

</script>

<style scoped lang="less">

</style>
