<template>
  <div class="ml-6 h-full">
    <n-flex vertical>
      <n-text depth="3" class="text-xs">应用信息</n-text>
      <n-flex vertical class="pr-10" :size="'medium'">
        <div>
          <div class="float-left">
            版本信息
            <n-text depth="3" class="ml-2 text-xs">{{ appVersion }}</n-text>
          </div>
          <div class="float-right">
            <n-button size="small" disabled @click="handleCheckUpdate">检查更新</n-button>
          </div>
        </div>
      </n-flex>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {AppApi} from "@render/api/app/AppApi";

const appVersion = ref(null)


onMounted(async () => {
  appVersion.value = await AppApi.getAppVersion()
})

const handleCheckUpdate = () => {

}
</script>

<style scoped lang="less">

</style>
