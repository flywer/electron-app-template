<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider
          :placement="'bottom-right'"
          :container-style="{bottom:'25px'}"
          :max="3"
      >
        <n-message-provider>
          <slot/>
          <naive-provider-content/>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import {defineComponent, h} from 'vue';
import {useLoadingBar, useDialog, useMessage, useNotification} from 'naive-ui';

defineOptions({name: 'NaiveProvider'});

// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools();
  },
  render() {
    return h('div');
  }
});
</script>
