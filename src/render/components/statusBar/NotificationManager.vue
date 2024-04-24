<template>
  <n-button quaternary size="small" class="h-full" @click="handleClick" style="border-radius:0">
    <template #icon>
      <n-badge
          dot
          :offset="[-3, 3]"
          :type="useAppNotificationStore().notificationList[0]?.type||'info'"
          :show="useAppNotificationStore().notificationList.filter(item=>item.readFlag == 0).length > 0"
      >
        <n-icon :size="20">
          <Alert16Regular/>
        </n-icon>
      </n-badge>
    </template>
  </n-button>

  <div
      id="drawer-target"
      class="fixed top-[41px] bottom-[25px] right-0 w-full flex items-center justify-center overflow-hidden pointer-events-none"/>

  <n-drawer
      to="#drawer-target"
      v-model:show="useStatusBarStore().notificationManagerShow"
      :default-width="330"
      :max-width="600"
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
          <div v-show="useAppNotificationStore().notificationList.length>0">
            <div class="float-left text-xs" style="line-height: 22px">
              <n-text class="items-center justify-center select-none">时间线</n-text>
            </div>
            <div class="float-right">
              <n-button text type="info" class="text-xs" @click="handleClearAllNotifications">全部清除</n-button>
            </div>
          </div>

          <n-scrollbar class="pr-2" style="height: calc(100vh - 146px)" :trigger="'hover'">
            <n-flex vertical class="pb-2 pr-2">
              <NotificationCard
                  v-for="notification in useAppNotificationStore().notificationList"
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
import {onMounted} from "vue";
import {useAppNotificationStore} from "@render/stores/app/appNotification";
import {useIpc} from "@render/plugins";
import {AppNotificationChannel} from "@common/channels/app/AppNotificationChannel";
import {AppNotification} from "@main/entity/localCache/AppNotification";
import NotificationCard from "@render/components/statusBar/components/NotificationCard.vue";
import {useStatusBarStore} from "@render/stores/app/statusBar";

const ipc = useIpc()

onMounted(async () => {
  await useAppNotificationStore().notificationListInit()
})

const handleClick = () => {
  const before = useStatusBarStore().notificationManagerShow
  useStatusBarStore().allHidden()
  if (before) {
    useStatusBarStore().notificationManagerShow = false
  } else {
    window.$notification.destroyAll()
    useAppNotificationStore().readAllNotifications()
    useStatusBarStore().notificationManagerShow = true
  }
}

const handleClearAllNotifications = () => {
  useAppNotificationStore().clearAllNotifications()
}

ipc.on(AppNotificationChannel.SEND_MAIN_NOTIFICATION, async (notification: AppNotification) => {
  if (notification) {
    window.$notification.create({
      duration: 3000,
      title: notification.title,
      content: notification.content,
      type: notification.type,
      onClose: () => {
        useAppNotificationStore().readNotification(notification.id)
      }
    });
    await useAppNotificationStore().notificationListInit()
  }
})
</script>

<style scoped lang="less">

</style>
