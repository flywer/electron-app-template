<template>
  <div id="app-bar"
       class="w-screen fixed top-0 left-0 h-10 z-40">
    <WindowLabelBar class="absolute top-0 left-0"/>

<!--    <TopTipBar class="absolute top-0 left-1/2 -translate-x-1/2"/>-->

    <TopButtonBar class="absolute top-0 right-[145px]"/>

    <WindowControlBar class="absolute top-0 right-0 z-50"/>

    <n-divider class="fixed top-10 left-0 right-0" style="margin: 0"/>
  </div>
</template>

<script setup lang="ts">
import WindowControlBar from "@render/components/appBar/WindowControlBar.vue";
import TopButtonBar from "@render/components/appBar/TopButtonBar.vue";
import TopTipBar from "@render/components/appBar/TopTipBar.vue";
import WindowLabelBar from "@render/components/appBar/WindowLabelBar.vue";

</script>

<style scoped lang="less">
#app-bar {
  -webkit-app-region: drag; /*窗口拖动*/
}
</style>
