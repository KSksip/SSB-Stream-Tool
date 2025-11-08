<script setup lang="ts">
import {ref} from 'vue'
import { type OverlayInfo } from '~~/types/overlayInfo';

const socket = new WebSocket('ws://localhost:3000/_ws')
const { data } = await useFetch<OverlayInfo>('/api/get-data')

async function writeData() {
  await $fetch('/api/write-data', {
    method: 'post',
    body: data.value,
  }).then((res) => {
    if(res.written){
      socket.send('update')
    }
  })
}
</script>

<template>
  <div v-if="data" class="flex flex-col gap-10 [&_input]:outline items-center pb-10">
    <div>
      {{ data }}
      <br>
      <br>
    </div>

    <div class="flex gap-5">
      <input type="text" v-model="data.setInfo.round">
      <input type="text" v-model="data.setInfo.bestOf">
    </div>

    <div class="flex gap-10">
      <div v-for="player in data.player" class="flex flex-col w-60 gap-1">
        <input type="text" v-model="player.prefix">
        <input type="text" v-model="player.name">
        <input type="text" v-model="player.score">
        <input type="text" v-model="player.skin">
      </div>
    </div>
    <button @click="writeData()" class="outline bg-zinc-200 hover:cursor-pointer">Update</button>
  </div>
</template>
