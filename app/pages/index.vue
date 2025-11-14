<script setup lang="ts">
import {ref} from 'vue'
import { type OverlayInfo } from '~~/types/overlayInfo';

import playerCard from '~/components/index/player-card.vue';
import customNumberInput from '~/components/interface/custom-number-input.vue';
import customCombobox from '~/components/interface/custom-combobox.vue';

const socket = new WebSocket('ws://localhost:3000/_ws')
const playerData  = ref(await $fetch<OverlayInfo>('/api/get-data'))
const gamesList = ref<string[]>((await $fetch<{data: string[]}>('/api/get-games-list')).data)

const showMenu = ref(false)

const charactersData = ref()

const selectedGame = ref('')

async function writeData() {
  await $fetch('/api/write-data', {
    method: 'post',
    body: playerData.value,
  }).then((res) => {
    if(res){
      socket.send('update')
    }
  })
}

function resetScores(){
  playerData.value.player[0].score = 0
  playerData.value.player[1].score = 0
}

const style = {
  ddInputClass: "rounded-sm px-1 py-0.5 border-zinc-300 inset-shadow-sm",
  ddMenuClass: "border-zinc-300 rounded-b-sm shadow-sm [&_button]:hover:bg-zinc-100"
}

watch(selectedGame, async () => {
  if(gamesList.value.includes(selectedGame.value)){
    console.log('a')
    await $fetch('/api/get-game-characters', {
      method: 'post',
      body: {selectedGame: selectedGame.value},
    }).then((res) => {
      console.log(res)
      charactersData.value = res.data
    })
  }
})

//make elements stop complaining
const test = ref([])

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex z-40 justify-between bg-white text-zinc-500 shadow-sm shadow-black/10 px-2.5 py-1.5">
      <div class="flex gap-6 px-3 text-black">
        <button class="hover:cursor-pointer" @click="showMenu = !showMenu">
          <Icon class="scale-150 translate-y-0.5" name="radix-icons:hamburger-menu" />
        </button>
        <custom-combobox 
          :inputClass="style.ddInputClass"
          :menuClass="style.ddMenuClass"
          class="w-35 my-auto"
          placeholder="Game" 
          v-model="selectedGame"
          :options="gamesList"  
        />
      </div>

      <div>
        <button tooltip="help">
          <Icon class="scale-150 translate-y-0.5" name="radix-icons:question-mark-circled" />
        </button>
      </div>
    </div>

    <div :class="showMenu ? 'animate-fade-in-from-left' : 'animate-fade-out-to-left hidden'" class="w-1/3 z-30 h-full bg-white/95 shadow-md shadow-black/50 fixed outline outline-zinc-300 flex flex-col py-14 ps-7">
      <button class="flex w-fit *:my-auto gap-3 hover:text-zinc-500 hover:cursor-pointer transition">
        <Icon name="radix-icons:gear" class="scale-150"></Icon>
        <h3 class="text-lg">Settings</h3>
      </button>
    </div>

    <div v-if="playerData" class="flex flex-col gap-3 items-center pb-10">
  
      <div class="flex gap-4">
        
        <playerCard label="Player 1" :charactersList="charactersData" class="w-90" v-model="playerData.player[0]"></playerCard>
        
        <div class="flex flex-col gap-2 items-center">
          <h1 class="text-xl">Score</h1>
          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center justify-between w-full">
              <customNumberInput v-model="playerData.player[0].score" class="outline-zinc-300 w-12 rounded-sm inset-shadow-sm py-0.5 ps-2"/>
              <button @click="resetScores()" class="outline flex outline-zinc-300 size-7 rounded-sm shadow-sm hover:cursor-pointer">
                <Icon name="radix-icons:reload" class="m-auto"/>
              </button>
              <customNumberInput v-model="playerData.player[1].score" class="outline-zinc-300 w-12 rounded-sm inset-shadow-sm py-0.5 ps-2"/>
            </div>

            <div class="flex flex-col items-center gap-0.5">
              <span class="">Best Of</span>
              <div class="flex gap-2 [&_button]:size-6 [&_button]:outline [&_button]:outline-zinc-300 [&_button]:rounded-sm [&_button]:hover:cursor-pointer">
                <!-- fix this (make concise) -->
                <button :class="playerData.setInfo.bestOf == 1 ? 'inset-shadow-sm inset-shadow-black/15' : 'shadow-sm'" @click="playerData.setInfo.bestOf = 1">1</button>
                <button :class="playerData.setInfo.bestOf == 3 ? 'inset-shadow-sm inset-shadow-black/15' : 'shadow-sm'" @click="playerData.setInfo.bestOf = 3">3</button>
                <button :class="playerData.setInfo.bestOf == 5 ? 'inset-shadow-sm inset-shadow-black/15' : 'shadow-sm'" @click="playerData.setInfo.bestOf = 5">5</button>
                
                <!-- make this thing do something -->
                <button class=""><Icon name="radix-icons:dots-horizontal" class="size-fit translate-y-0.5 text-black"></Icon></button>
              </div>
            </div>
            
            <custom-combobox 
              :inputClass="style.ddInputClass"
              :menuClass="style.ddMenuClass"
              class="w-35"
              placeholder="Phase" 
              v-model="playerData.setInfo.phase"
              :options="test"  
            />
  
            <custom-combobox 
              :inputClass="style.ddInputClass"
              :menuClass="style.ddMenuClass"
              class="w-35"
              placeholder="Match" 
              v-model="playerData.setInfo.match"
              :options="test"  
            />
            
            <!-- <button @click="writeData()" class="w-full hover:cursor-pointer bg-yellow-400 rounded-sm text-white flex justify-center gap-2 px-3 shadow-sm py-1">
              <span>Swap Sides</span>
              <Icon name="radix-icons:shuffle" class="my-auto"/>
            </button> -->
          </div>
        </div>
  
        <playerCard label="Player 2" :charactersList="charactersData" class="w-90" v-model="playerData.player[1]"></playerCard>
      </div>
      <div class="flex gap-2 w-full justify-center">
  
        <button @click="writeData()" class="w-fit hover:cursor-pointer bg-zinc-400 rounded-sm text-white flex justify-center gap-2 px-3 shadow-sm py-1">
          <span>Reset</span>
          <Icon name="radix-icons:reload" class="my-auto"/>
        </button>
  
        <button @click="writeData()" class="w-fit hover:cursor-pointer bg-green-400 rounded-sm text-white flex justify-center gap-2 px-3 shadow-sm py-1">
          <span>Update</span>
          <Icon name="radix-icons:update" class="my-auto"/>
        </button>
        
  
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-in {
	opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-out;
	animation-duration: 0.22s;
}

@keyframes fadeInOpacity {
	0% {
    transform: translateX(-66%);
		opacity: 0;
	}
	100% {
    transform: translateX(0);
		opacity: 1;
	}
}
</style>
