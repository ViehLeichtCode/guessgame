<script setup lang="ts">
import type {Answer} from "~/types";

const gameState = useGameState();

const selectedAnswer = ref<Answer | null>(null);

async function onSubmitAnswer() {
  const currentQuestion = gameState.getCurrentQuestion();
  if (!selectedAnswer.value || !currentQuestion) {
    return;
  }
  await gameState.submitAnswer(currentQuestion, selectedAnswer.value);
  gameState.state = "RESULTS";
}
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 text-center"
      v-if="gameState.playerId === gameState.getCurrentQuestion()?.active_player">
    Du bist dran! Bitte beantworte die Frage für dich selbst
  </h2>
  <h2 class="text-2xl font-bold mb-4 text-center"
      v-if="gameState.playerId !== gameState.getCurrentQuestion()?.active_player">
    Was denkst du, was {{ gameState.getActivePlayer()?.name }} antworten würde?
  </h2>

  <h3 class="text-xl font-bold mb-4 p-3 bg-amber-400 border-2 border-gray-200 rounded-2xl w-full text-start">
    {{ gameState.getCurrentQuestion()?.text }}
  </h3>
  <div v-for="answer in gameState.getCurrentQuestion()?.answer_options" :key="answer.id"
       class="select-none w-full">
    <label
        :for="'answer-' + answer.id"
        class="text-lg font-bold mb-2 p-3 bg-amber-700 border-2 border-gray-400 rounded-2xl w-full text-start flex flex-row items-center gap-2 cursor-pointer"
    >
      <RadioButton
          :inputId="'answer-' + answer.id"
          v-model="selectedAnswer"
          :value="answer"
      />
      {{ answer.text }}
    </label>
  </div>

  <Button
      :disabled="!selectedAnswer"
      @click="onSubmitAnswer"
  >Antwort abschicken
  </Button>
</template>

<style scoped>

</style>