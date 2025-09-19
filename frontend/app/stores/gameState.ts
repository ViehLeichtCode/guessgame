import {defineStore} from "pinia";
import type {Answer, Category, Player, Question, Results} from "~/types";
import {useGameEventsStore} from "./gameEvents"

export const useGameState = defineStore('GameState', () => {
    const error = ref<string>("")
    const gameId = ref<string | null>(null);
    const playerId = ref<number | null>(null);
    const questions = ref<Question[]>([]);
    const categories = ref<Category[]>([]);
    const players = ref<Player[]>([]);
    const results = ref<Results | null>(null)
    const state = ref<"NONE" | "JOIN" | "LOBBY" | "QUESTION" | "RESULTS">("NONE");

    const eventsStore = useGameEventsStore();

    async function fetchCategories() {
        const resp = await fetch(`/api/categories`);
        if (resp.ok) {
            categories.value = (await resp.json()) as Category[];
        } else {
            error.value = "Failed to fetch categories";
        }
    }

    async function createGame(categories: number[]) {
        const resp = await fetch(`/api/create-game`, {
            method: "POST",
            body: JSON.stringify({
                categories: categories
            })
        })
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        gameId.value = (await resp.json()).game_id as string;
    }

    async function joinGame(gameId: string, playerName: string) {
        const resp = await fetch(`/api/join-game`, {
            method: "POST",
            body: JSON.stringify({
                player_name: playerName,
                game_id: gameId,
            })
        })
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        const json = await resp.json();
        playerId.value = json.player_id as number;
        players.value = json.players as Player[];
    }

    async function submitAnswer(question: Question, answer: Answer) {
        const resp = await fetch(`/api/current-question/submit-answer`, {
            method: "POST",
            body: JSON.stringify({
                question_id: question.id,
                answer_id: answer.id
            })
        })
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
    }

    async function startGame() {
        const resp = await fetch(`/api/start-game`, {
            method: "POST"
        })
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
    }

    async function nextQuestion() {
        const resp = await fetch(`/api/current-question/next`, {
            method: "POST"
        })
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
    }

    async function endGame() {
        const resp = await fetch(`/api/end-game`, {
            method: "POST"
        })
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
    }

    function getCurrentQuestion(): Question | null {
        return questions.value[questions.value.length - 1] || null;
    }

    function getActivePlayer(): Player | null {
        return getPlayer(getCurrentQuestion()?.active_player);
    }

    function getPlayer(player_id: number | undefined): Player | null {
        for (const player of players.value) {
            if (player.id === player_id) {
                return player;
            }
        }
        return null;
    }

    function getAnswerText(answer_id: number): string | null {
        for (const question of questions.value.reverse()) {
            for (const answerOption of question.answer_options) {
                if (answerOption.id === answer_id) {
                    return answerOption.text;
                }
            }
        }
        return null;
    }

    watch(
        () => eventsStore.lastEvent,
        async (event) => {
            if (!event) return

            switch (event.type) {
                case 'PLAYER_JOINED':
                    players.value.push(event.data as Player);
                    break

                case 'ALL_PLAYERS_ANSWERED':
                    results.value = event.data as Results;
                    for (const player of players.value) {
                        for (const answerResult of results.value.other_answers) {
                            if (player.id === answerResult.player_id) {
                                player.score = answerResult.new_score;
                            }
                        }
                    }
                    break

                case 'NEXT_QUESTION':
                    console.log("Next Question received")
                    questions.value.push(event.data as Question);
                    results.value = null;
                    state.value = "QUESTION";
                    break
            }
        },
        {deep: true}
    )

    eventsStore.connect("http://localhost:8080/events", ["PLAYER_JOINED", "ALL_PLAYERS_ANSWERED", "NEXT_QUESTION"])

    return {
        error,
        gameId,
        playerId,
        categories,
        players,
        results,
        fetchCategories,
        getActivePlayer,
        getCurrentQuestion,
        createGame,
        joinGame,
        submitAnswer,
        endGame,
        nextQuestion,
        startGame,
        getAnswerText,
        getPlayer,
        state
    };
})