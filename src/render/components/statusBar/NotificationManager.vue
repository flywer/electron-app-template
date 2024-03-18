<template>
  <n-button quaternary size="small" class="h-full" @click="handleAlertClick">
    <n-badge
        dot
        :offset="[-3, 3]"
        :type="useAppNotificationStore().notificationList[0]?.type||'info'"
        :show="useAppNotificationStore().notificationList.length > 0"
    >
      <n-icon :size="20">
        <Alert16Regular/>
      </n-icon>
    </n-badge>
  </n-button>

  <div
      id="drawer-target"
      class="fixed top-[41px] bottom-[25px] right-0 w-full flex items-center justify-center overflow-hidden pointer-events-none"/>

  <n-drawer
      to="#drawer-target"
      v-model:show="drawerActive"
      :default-width="230"
      :max-width="500"
      :min-width="210"
      :height="200"
      :placement="'right'"
      :trap-focus="false"
      :block-scroll="false"
      :show-mask="'transparent'"
      :resizable="true"
  >
    <n-drawer-content :header-style="{padding:'10px'}" :body-content-style="{padding:'10px',overflow:'hidden'}">
      <template #header>
        <n-text class="text-sm select-none">通知</n-text>
      </template>
      <template #default>

        <div
            v-if="useAppNotificationStore().notificationList.length==0"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-xs select-none"
        >
          建议、事件，以及错误将出现在这里
        </div>

        <n-flex vertical>
          <div style="line-height: 22px" v-show="useAppNotificationStore().notificationList.length>0">
            <div class="float-left text-xs">
              <n-text class="items-center justify-center">时间线</n-text>
            </div>
            <div class="float-right">
              <n-button text type="info" class="text-xs" @click="handleReadAllNotifications">全部清除</n-button>
            </div>
          </div>

          <n-scrollbar class="pr-2" style="height: calc(100vh - 146px)" :trigger="'hover'">
            <n-flex vertical class="pb-2 pr-2" v-for="notification in useAppNotificationStore().notificationList">
              <NotificationCard
                  :id="notification.id"
                  :title="notification.title"
                  :content="notification.content"
                  :type="notification.type"
                  :releaseTime="notification.releaseTime"/>
            </n-flex>
          </n-scrollbar>

        </n-flex>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import {Alert16Regular} from '@vicons/fluent'
import {onMounted, ref, watch} from "vue";
import NotificationCard from "@render/components/statusBar/components/NotificationCard.vue";
import {useAppNotificationStore} from "@render/stores/appNotification";

const drawerActive = ref(false)

onMounted(async () => {
  await useAppNotificationStore().notificationListInit()
})

const handleAlertClick = () => {
  drawerActive.value = !drawerActive.value
  if (drawerActive.value) {
    window.$notification.destroyAll()
    useAppNotificationStore().notificationListInit()
  }
}

const handleReadAllNotifications = () => {
  useAppNotificationStore().readAllNotifications()
}

</script>

<style scoped lang="less">

</style>
