<template>
  <n-flex class="window-btn h-10" :size="0" :wrap="false">
    <n-button text
              :style="minButtonStyles"
              @mouseenter="onMinButtonMouseEnter"
              @mouseleave="onMinButtonMouseLeave"
              @click="WindowApi.windowMinimize()">
      <n-icon class="w-12">
        <LineHorizontal120Filled/>
      </n-icon>
    </n-button>
    <n-button text class="common-btn"
              :style="maxButtonStyles"
              @mouseenter="onMaxButtonMouseEnter"
              @mouseleave="onMaxButtonMouseLeave"
              @click="WindowApi.windowMaximize()">
      <n-icon class="w-12">
        <Maximize48Regular/>
      </n-icon>
    </n-button>
    <n-button text class="close-btn" @click="WindowApi.windowClose()">
      <n-icon class="w-12">
        <Dismiss48Regular/>
      </n-icon>
    </n-button>
  </n-flex>
</template>

<script setup lang="ts">
import {LineHorizontal120Filled, Maximize48Regular, Dismiss48Regular} from '@vicons/fluent';
import {WindowApi} from "@render/api/WindowApi";
import {useThemeVars} from "naive-ui";
import {reactive} from "vue";
import {AppSettingsApi} from "@render/api/AppSettingsApi";
import {AppSettingsConstant} from "@common/constants/AppSettingsConstant";

const themeVars = useThemeVars().value

const state = reactive({
  defaultBackground: '', // 根据需要设置默认的背景颜色
  hoverBackground: themeVars.buttonColor2Hover
})

const minButtonStyles = reactive({
  backgroundColor: state.defaultBackground,
})

const onMinButtonMouseEnter = async () => {
  const themeMode = await AppSettingsApi.getAppSettingByName(AppSettingsConstant.THEME_MODE)

  if (themeMode === null || themeMode.settingValue === 'light') {
    minButtonStyles.backgroundColor = 'rgb(231,229,229)'
  } else {
    minButtonStyles.backgroundColor = 'rgba(255,255,255,0.25)'
  }
}

const onMinButtonMouseLeave = () => {
  minButtonStyles.backgroundColor = state.defaultBackground
}

const maxButtonStyles = reactive({
  backgroundColor: state.defaultBackground,
})

const onMaxButtonMouseEnter = async () => {
  const themeMode = await AppSettingsApi.getAppSettingByName(AppSettingsConstant.THEME_MODE)

  if (themeMode === null || themeMode.settingValue === 'light') {
    maxButtonStyles.backgroundColor = 'rgb(231,229,229)'
  } else {
    maxButtonStyles.backgroundColor = 'rgba(255,255,255,0.25)'
  }
}

const onMaxButtonMouseLeave = () => {
  maxButtonStyles.backgroundColor = state.defaultBackground
}
</script>

<style scoped lang="less">
.window-btn {
  -webkit-app-region: no-drag;
  /*background-color: transparent;*/
}

//关闭窗口按钮 动画特殊
.close-btn:hover {
  background-color: #ec4f4f;

  .n-icon {
    color: white;
  }
}
</style>
