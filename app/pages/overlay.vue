<script setup lang="ts">
import { ref } from 'vue';
import { type OverlayInfo } from '~~/types/overlayInfo';

const data = ref<OverlayInfo | null>(null)
const socket = new WebSocket('ws://localhost:3000/_ws')


socket.onopen = () => {
  console.log('opened')
  socket.send('init')
}

socket.onmessage = (event) => {
  console.log(event)
  data.value = JSON.parse(event.data)
}


</script>

<template>
  <div v-if="data">
    <p>{{ typeof(data) }}</p>
    <p>{{data.setInfo.round}}</p>
    <p>{{data.setInfo.bestOf}}</p>
    <p>{{data}}</p>
    
  </div>
</template>

