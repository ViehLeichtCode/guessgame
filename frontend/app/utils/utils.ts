export function getQueryParam(
    route: ReturnType<typeof useRoute>,
    key: string
): string | null {
    const value = route.query[key]
    if (Array.isArray(value)) return value[0] as string
    if (typeof value === 'string') return value
    return null
}