<template>
  <n-layout has-sider class="h-full">
    <n-layout-sider
        class="padding-top-32 h-full-vh"
        collapse-mode="width"
        :collapsed-width="64"
        :width="180"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
        style="background-color: #aad9f5"
    >
      <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :expand-icon="expandIcon"
      />
    </n-layout-sider>
    <n-layout class="padding-top-32" content-style="background-color:rgb(34 103 151)">
      <n-message-provider>
        <router-view/>
      </n-message-provider>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
//import {routeName} from "@render/router";
import {h, ref, Component} from 'vue'
import {NIcon} from 'naive-ui'
import type {MenuOption} from 'naive-ui'
import {CaretDownOutline} from '@vicons/ionicons5'
import {RouterLink} from "vue-router";
import {
  LogOutOutline as HomeIcon
} from '@vicons/ionicons5'

import {BareMetalServer} from '@vicons/carbon'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

// 菜单
/*
const menuOptions: MenuOption[] = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: routeName.HOST,
              }
            },
            {default: () => '主机'}
        ),
    key: routeName.HOST,
    icon: renderIcon(BareMetalServer)
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: routeName.TERMINAL,
              }
            },
            {default: () => '主机'}
        ),
    key: routeName.TERMINAL,
    icon: renderIcon(HomeIcon)
  }
]
*/

const collapsed = ref(true)

const expandIcon = () => {
  return h(NIcon, null, {default: () => h(CaretDownOutline)})
}

</script>

<style scoped lang="less">

</style>
