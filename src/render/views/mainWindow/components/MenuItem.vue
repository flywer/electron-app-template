<template>
  <n-flex id="menu-item" class="items-center" vertical :justify="'center'" :size="2">
    <n-icon :size="22">
      <slot name="icon"/>
    </n-icon>
    <span class="text-xs select-none">{{ title }}</span>
  </n-flex>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>

<style scoped lang="less">

</style>
