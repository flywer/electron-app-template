<template>
  <div>
    <div class="float-left">
      {{ label }}
      <n-text depth="3" class="ml-2 text-xs">{{ folderSize }}</n-text>
    </div>
    <div class="float-right">
      <n-button size="small" :disabled="disable" @click="handleClick">打开</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {AppApi} from "@render/api/app/AppApi";

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  disable: {
    type: Boolean,
    required: false,
  }
})

const folderSize = ref(null)

watch(() => props.path, async (newValue) => {
  if (newValue)
    folderSize.value = await AppApi.getFolderSize(newValue)
})

const handleClick = () => {
  AppApi.openPath(props.path)
}


</script>

<style scoped lang="less">

</style>
