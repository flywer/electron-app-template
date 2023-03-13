<script setup lang="ts">
import {sendMsgToMainProcess} from '@render/api'
import {useIpc} from '@render/plugins/ipc'
import {ref} from 'vue'
import logo from '@render/assets/logo.png'

const props = defineProps({
  title: {
    type: String,
    default: ' Electron App Template',
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
  <n-grid x-gap="0" :cols="1" style="text-align: center;">
    <n-gi span="24">
      <img alt="Vue logo" :src="logo" class="logo">
    </n-gi>

    <n-gi>
      <h1>{{ title }}</h1>
    </n-gi>
    <n-gi>
      <n-input
          v-model:value="log"
          readonly
          type="textarea"
          placeholder=""
          size="small"
          style="text-align: left;width: 500px"
          :autosize="{ minRows: 3, maxRows: 3 }"
      />
    </n-gi>
    <n-gi>
      <div style="margin-top: 20px">
        <n-input v-model="msg" type="text" placeholder="发送消息给主进程" style="width: 200px"/>
        <n-button style="margin-left: 20px" @click="sendMsg">
          发送
        </n-button>
      </div>
    </n-gi>
  </n-grid>
</template>

<style>

</style>
