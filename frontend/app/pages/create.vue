<script setup lang="ts">
import {onMounted, ref} from 'vue'
import Checkbox from 'primevue/checkbox'
import {useGameState} from '~/stores/gameState'
import Button from 'primevue/button'

const gameState = useGameState();
await gameState.fetchCategories();

// Auswahl
const selectedCategories = ref<number[]>([])

// Hilfsfunktion: zufällig 3 auswählen
function pickRandomCategories() {
  const shuffled = [...gameState.categories].sort(() => 0.5 - Math.random())
  selectedCategories.value = shuffled.slice(0, 3).map(c => c.id)
}

async function onCreateGame() {
  await gameState.createGame(selectedCategories.value);
  gameState.state = "JOIN";
}

onMounted(() => {
  pickRandomCategories()
})
</script>

<template>
  <div class="flex flex-col p-6">
    <h2 class="text-xl font-semibold mb-4">Kategorien wählen</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
          v-for="cat in gameState.categories"
          :key="cat.id"
          class="p-4 rounded-xl border transition cursor-pointer"
          :class="{
          'bg-primary/10 border-primary': selectedCategories.includes(cat.id),
          'bg-surface-0 border-gray-200 hover:border-primary/50': !selectedCategories.includes(cat.id)
        }"
      >
        <label class="cursor-pointer font-medium select-none" :for="'cat-' + cat.id">
          <Checkbox
              :inputId="'cat-' + cat.id"
              v-model="selectedCategories"
              :value="cat.id"
          />
          {{ cat.name }}
        </label>
      </div>
    </div>

    <Button :disabled="selectedCategories.length == 0" @click="onCreateGame" class="my-4">Spiel erstellen</Button>
  </div>
</template>

<style scoped>

</style>