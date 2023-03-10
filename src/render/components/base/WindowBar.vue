<!-- 窗口的右上角三个操作按钮 -->
<template>
  <n-layout id="window-bar">
    <n-layout-content>
      <n-space justify="end" id="btn-group">
        <n-button-group>
          <n-button size="tiny" :bordered=false class="window-btn" @click="window_min">
            <n-icon style="font-size: large;">
              <MinusOutlined/>
            </n-icon>
          </n-button>
          <n-button size="tiny" :bordered=false class="window-btn" @click="window_max">
            <n-icon style="font-size: large;">
              <BorderOutlined/>
            </n-icon>
          </n-button>
          <n-button size="tiny" :bordered=false class="window-btn close-btn" @click="window_close">
            <template #icon>
              <n-icon>
                <CloseOutlined/>
              </n-icon>
            </template>
          </n-button>
        </n-button-group>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import {MinusOutlined, BorderOutlined, CloseOutlined} from "@vicons/antd";
import {window_max,window_min,window_close} from "@render/api/window.api";
</script>

<style scoped lang="less">
#window-bar {
  -webkit-app-region: drag; /*头部可拖动*/
  background-color: transparent; /*transparent*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 32px;
  z-index: 9999;
  user-select: none;

  .n-layout-content {
    background-color: transparent;
  }

  //按钮
  .window-btn {
    -webkit-app-region: no-drag;
    width: 47px;
    height: 26px;
    border-radius: 0;
  }

  //设置图标默认颜色
  :deep(.n-icon) {
    color: rgb(51, 54, 57);
  }

  //取消按钮自带的动画
  :deep(.n-button > .n-base-wave) {
    animation: none;
  }

  //背景色变换
  :deep(.n-button):hover {
    background-color: #e7e7e7;
  }

  //关闭窗口按钮 动画特殊
  .close-btn:hover {
    background-color: #ec4f4f;

    .n-icon {
      color: white;
    }
  }
}
</style>
