import { useSignal } from "@preact/signals"

export const useSearchQuery = (callback: (query: string) => void) => {
    const query = useSignal('')

    const changeSearchQuery = (q: string) => {
        if (q.length > 0) callback(q)
        query.value = q
    }

    return {
        changeSearchQuery,
        searchQuery: query.value
    }
}