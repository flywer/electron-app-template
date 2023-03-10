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
        style="background-color: #cdeaf8"
    >
      <n-menu
          ref="menuInstRef"
          v-model:value="selectedKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout>
      <n-message-provider>
        <router-view/>
      </n-message-provider>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import {routeName} from "@render/router";
import {h, ref} from 'vue'
import type {MenuOption, MenuInst} from 'naive-ui'
import {RouterLink} from "vue-router";
import {HomeOutlined} from '@vicons/antd'
import {AccessibleIcon} from '@vicons/fa'
import {renderIcon} from "@render/utils/common/renderIcon";

// 菜单项
const menuOptions: MenuOption[] = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: routeName.view1,
              }
            },
            {default: () => '首页'}
        ),
    key: routeName.view1,
    icon: renderIcon(HomeOutlined)
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: routeName.view2,
              }
            },
            {default: () => '页面'}
        ),
    key: routeName.view2,
    icon: renderIcon(AccessibleIcon)
  }
]

// 菜单实例
const menuInstRef = ref<MenuInst | null>(null)
// 默认选中的菜单
const selectedKey = ref(menuOptions[0].key)
// 菜单是否折叠
const collapsed = ref(false)

</script>

<style scoped lang="less">

</style>
