<script setup lang="ts">
import {useGameState} from '~/stores/gameState'
import {useToast} from "primevue/usetoast";
import {storeToRefs} from 'pinia';

const toast = useToast();

const gameState = useGameState();

const router = useRouter()

watch(() => gameState.state, (newState) => {
  switch (newState) {
    case "NONE":
      router.push("/");
      break;
    case "JOIN":
      router.push(`/join?game-id=${gameState.gameId}`);
      break;
    case "LOBBY":
      router.push("/lobby");
      break;
    case "QUESTION":
      router.push("/question");
      break;
    case "RESULTS":
      router.push("/results");
      break;
  }
})

const {error} = storeToRefs(gameState);

watch(error, () => {
  toast.add({severity: 'error', summary: 'Something went wrong', detail: gameState.error, life: 3000});
})
</script>

<template>
  <div
      class="flex flex-col gap-2 justify-center items-center
       h-full
       bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-white
        p-8">
    <slot/>
  </div>
</template>

<style scoped>

</style>