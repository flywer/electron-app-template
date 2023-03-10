<script setup lang="ts">
import {sendMsgToMainProcess} from '@render/api'
import {useIpc} from '@render/plugins/ipc'
import {ref} from 'vue'
import logo from '@render/assets/logo.png'

const props = defineProps({
  title: {
    type: String,
    default: 'Vite + Electron & Esbuild',
  },
})

const log = ref('')
const msg = ref('')

const sendMsg = async () => {
  try {
    log.value += `[render]: ${msg.value} \n`
    const {data} = await sendMsgToMainProcess(msg.value)
    log.value += `[main]: ${data}  \n`
  } catch (error) {
    console.error(error)
  }
}

const ipc = useIpc()

ipc.on('reply-msg', (msg: string) => {
  log.value += `[main]: ${msg}  \n`
})
</script>

<template>
  <n-grid x-gap="0" :cols="1" style="text-align: center;
    margin-top: 60px;">
    <n-gi span="24">
      <img alt="Vue logo" :src="logo" class="logo">
    </n-gi>

    <n-gi>
      <h1>{{ title }}</h1>
    </n-gi>
    <n-gi>
      <textarea v-model="log" cols="60" rows="10" disabled/>
    </n-gi>
    <n-gi>
      <div style="margin-top: 20px">
        <input v-model="msg" type="text" placeholder="发送消息给主进程" style="width: 200px">
        <button style="margin-left: 20px" @click="sendMsg">
          发送
        </button>
      </div>
    </n-gi>
  </n-grid>
</template>

<style>

</style>
