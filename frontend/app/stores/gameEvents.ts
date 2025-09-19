import { defineStore } from 'pinia'

export const useGameEventsStore = defineStore('gameEvents', () => {
    const events = ref<any[]>([])
    const lastEvent = ref<any | null>(null)
    let eventSource: EventSource | null = null

    const connect = (url: string, eventTypes: string[]) => {
        if (eventSource) return // schon verbunden
        if (!import.meta.client) return  // ❌ auf Server nix machen

        eventSource = new EventSource(url)

        eventSource.onopen = () => {
            console.log("✅ SSE verbunden:", url)
        }

        for (const eventType of eventTypes) {
            eventSource.addEventListener(eventType, (event) => {
                const data = JSON.parse(event.data)
                events.value.push({ type: eventType, data })
                lastEvent.value = { type: eventType, data }
            })
        }

        eventSource.onerror = (err) => {
            console.error("❌ SSE Fehler:", err)
            eventSource?.close()
            eventSource = null
        }
    }

    const disconnect = () => {
        eventSource?.close()
        eventSource = null
    }

    return {
        events,
        lastEvent,
        connect,
        disconnect
    }
})