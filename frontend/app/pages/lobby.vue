<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import {onMounted, ref} from 'vue'
import {useGameState} from '~/stores/gameState'
import Chip from 'primevue/chip'
import Button from 'primevue/button'

const gameState = useGameState();

const currentUrl = ref('')
const router = useRouter();

onMounted(() => {
  currentUrl.value = `${window.location.origin}/join?gameid=${gameState.gameId}`
})

function getRandomColor(): string {
  // HSL für schöne Pastelltöne
  const hue = Math.floor(Math.random() * 360)
  const saturation = 90
  const lightness = 70
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

async function onStartGame() {
  await gameState.startGame();
  gameState.state = "QUESTION";
}
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 text-center">Sag deinen Freund*innen diesen Code oder lass sie den QR Code
    scannen</h2>
  <h3 class="font-bold text-xl mb-4 text-center">Spiele-Code: {{ gameState.gameId }}</h3>
  <div>
    <qrcode-vue :value="currentUrl" :size="300" :margin="2"/>
  </div>
  <h2 class="text-2xl font-bold mb-4 text-center">Mitspieler*innen:</h2>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <Chip v-for="player in gameState.players" :key="player.id" :label="player.name"
          :style="{ backgroundColor: getRandomColor(), color: '#333' }"
          class="border-2 border-black/70 font-bold text-lg"/>
  </div>
  <Button @click="onStartGame">Spiel starten</Button>
</template>