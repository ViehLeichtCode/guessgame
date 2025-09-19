<script setup lang="ts">
import InputOtp from 'primevue/inputotp'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import {getQueryParam} from '~/utils/utils'
import {useGameState} from '~/stores/gameState'

const gameIdQueryParam = getQueryParam(useRoute(), 'gameid');

const gameId = ref(gameIdQueryParam ?? "");
const name = ref("")
const gameState = useGameState();

async function onJoinGame() {
  await gameState.joinGame(gameId.value, name.value);
  gameState.state = "LOBBY";
}
</script>

<template>
  <div>
    <div v-if="!gameIdQueryParam" class="flex flex-col gap-2 mb-8">
      <h2 class="text-xl font-bold">Bitte gib den Spiele-Code ein</h2>
      <InputOtp :length="8" v-model="gameId"></InputOtp>
    </div>
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-bold">Bitte gib deinen Namen ein</h2>
      <InputText v-model="name" placeholder="Dein Name"/>
      <Button :disabled="name.length < 3 || gameId.length != 8" @click="onJoinGame">Spiel betreten</Button>
    </div>
  </div>
</template>

<style scoped>

</style>