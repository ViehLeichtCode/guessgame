export default defineEventHandler(async (event) => {
    const pathParam = event.context.params?.path

    // Wenn path undefined oder ein String ist, absichern
    const path = Array.isArray(pathParam) ? pathParam.join('/') : (pathParam ?? '')

    const query = getQuery(event) // Query-Parameter übernehmen

    const url = `${process.env.API_BASE}/${path}`

    return await $fetch(url, {
        method: event.method,
        query,
        body: event.method !== 'GET' ? await readBody(event) : undefined,
        headers: {
            // Optional: Header weiterreichen
            ...event.headers
        }
    })
})