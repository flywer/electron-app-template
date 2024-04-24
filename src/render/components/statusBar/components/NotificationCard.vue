<template>
  <n-alert
      id="alert"
      :title="title"
      :type="type"
      closable
      @close="handleClose()"
  >
    <template #header>
      <n-ellipsis style="max-width: 75%">
        <span class="text-sm text-nowrap  whitespace-nowrap">{{ title }}</span>
      </n-ellipsis>
      <n-text style="line-height: 20px" class="text-[11px] float-right select-none" depth="3">
        {{ DateUtils.formatNotificationDate(new Date(releaseTime)) }}
      </n-text>
    </template>
    <template #default>
      <n-flex vertical>
        <n-ellipsis :line-clamp="5" :tooltip="{placement:'bottom'}">
          <div class="text-xs whitespace-pre-wrap">{{content}}</div>
        </n-ellipsis>
      </n-flex>
    </template>
  </n-alert>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {DateUtils} from "@common/utils/DateUtils";
import {useAppNotificationStore} from "@render/stores/app/appNotification";

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<"default" | "info" | "success" | "warning" | "error">,
    default: 'default'
  },
  releaseTime: {
    type: Date,
    required: true
  },
  content: String
})

const handleClose = () => {
  useAppNotificationStore().readNotification(props.id)
}

</script>

<style scoped lang="less">
#alert:deep(.n-alert-body) {
  padding-top: 8px;
  padding-left: 36px;
}

:deep(.n-base-icon) {
  font-size: 18px;
}

:deep(.n-alert__icon) {
  margin-top: 7px;
  margin-left: 8px;
}

:deep(.n-base-close) {
  margin-top: 8px;
  margin-right: 8px;
}
</style>
