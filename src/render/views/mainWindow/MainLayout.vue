<template>
  <div class="fixed top-10 bottom-6 left-0 right-0">
    <div class="fixed top-10 bottom-6 left-0 w-20">
      <n-menu
          id="app-menu"
          class="w-20 pt-2"
          :options="menuOptions"
          :default-value="routeName.helloWorld"
      />
      <n-divider class="absolute top-0 -right-2" vertical style="height: 100%"/>
    </div>
    <div class="fixed top-10 bottom-6 left-24 right-0">
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {MenuOption} from 'naive-ui'
import {h, onMounted} from "vue";
import {RouterLink, useRouter} from "vue-router";
import {routeName} from "@render/router";
import MenuItem from "@render/views/mainWindow/components/MenuItem.vue";
import {AppsList24Regular, DocumentBulletListMultiple24Regular, CalendarSettings20Regular} from "@vicons/fluent";

const router = useRouter()

const menuOptions: MenuOption[] = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: routeName.helloWorld,
              }
            },
            h(MenuItem, {title: '任务'}, {
              icon: h(AppsList24Regular)
            })
        ),
    key: routeName.helloWorld,
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
            h(MenuItem, {title: '项目'}, {
              icon: h(DocumentBulletListMultiple24Regular)
            })
        ),
    key: routeName.view2,
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: routeName.view3,
              }
            },
            h(MenuItem, {title: '模板'}, {
              icon: h(CalendarSettings20Regular)
            })
        ),
    key: routeName.view3,
  }
]

onMounted(() => {
  router.push({name: routeName.helloWorld});
})

</script>

<style scoped lang="less">
#app-menu:deep(.n-menu-item) {
  height: 50px;
}

#app-menu:deep(.n-menu-item-content-header) {
  width: 48px;
  position: absolute;
  left: -14px;
  top: 4px;
}
</style>
