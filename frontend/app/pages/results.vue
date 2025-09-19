<script setup lang="ts">
import Chart from "primevue/chart";
import { Chart as ChartJS, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(...registerables, ChartDataLabels);

// Default Settings für das Plugin
ChartJS.defaults.plugins.datalabels = {
  anchor: 'end',
  align: 'end',
  color: '#374151',
  font: { weight: 'bold' },
  formatter: (value: number) => value
};

const gameState = useGameState();
const players = computed(() => gameState.players.sort((a, b) => b.score - a.score));

const chartData = computed(() => ({
  labels: players.value.map(p => p.name),
  datasets: [
    {
      label: "Punkte",
      data: players.value.map(p => p.score),
      backgroundColor: "rgba(251, 191, 36)", // amber-400
    }
  ]
}));

const chartOptions = {
  indexAxis: 'y',
  plugins: {
    legend: {display: false}
  },
  responsive: true,
  layout: {
    padding: {
      right: 30 // etwas Platz für das Label schaffen
    }
  },
  scales: {
    x: {
      display: false
    },
    y: {
      ticks: {
        color: '#000000', // Tailwind gray-800
        font: {
          weight: 'bold'
        }
      },
      grid: {
        color: 'rgba(0,0,0,0)'
      }
    }
  }
};

async function onNextQuestion() {
  await gameState.nextQuestion();
  gameState.state = "QUESTION";
}

async function onEndGame() {
  await gameState.endGame();
  gameState.state = "NONE";
}
</script>

<template>
  <div v-if="gameState.results === null">
    <h2 class="text-2xl font-bold mb-4 text-center">
      Bitte warte bis alle Spieler*innen eine Antwort abgegeben haben
    </h2>
  </div>
  <div v-else class="flex flex-col items-center h-full">
    <h2 class="text-xl font-bold mb-4 p-3 bg-amber-400 border-2 border-gray-200 rounded-2xl w-full text-start">
      {{ gameState.getCurrentQuestion()?.text }}
    </h2>
    <h3 class="text-lg font-bold p-3 bg-amber-700 border-2 border-gray-400 rounded-t-2xl w-full text-start gap-2">
      {{ gameState.getActivePlayer()?.name }} hat "{{ gameState.getAnswerText(gameState.results.given_answer) }}"
      geantwortet
    </h3>
    <h3 class="text-lg font-bold p-3 bg-amber-700 border-2 border-gray-400 w-full text-start gap-2">
      Das haben {{ gameState.results.other_answers.filter(a => a.correct).length }} Spieler*innen richtig
      beantwortet
    </h3>
    <h4 v-for="answer of gameState.results.other_answers.filter(a => a.correct)" :key="answer.player_id"
        class="text-lg font-bold p-3 bg-amber-700 border-2 border-gray-400 rounded-b-2xl w-full text-start gap-2">
      {{ gameState.getPlayer(answer.player_id)?.name }}: +{{ answer.reward }} Punkte
    </h4>
    <div class="w-full max-w-2xl mx-auto mt-10">
      <Chart type="bar" :data="chartData" :options="chartOptions" class="p-4"/>
    </div>
    <Button @click="onNextQuestion">Nächste Frage</Button>
    <Button severity="secondary" @click="onEndGame">Spiel beenden</Button>
  </div>
</template>

<style scoped>

</style>