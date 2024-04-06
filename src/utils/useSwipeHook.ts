
import { Ref, useEffect } from "preact/hooks";

export const useSwipeHook = (callback: () => void, direction: 'swiped-left' | 'swiped-right' | 'swiped-up' | 'swiped-down', element: Ref<HTMLElement>) => {
    useEffect(() => {
        element.current?.addEventListener(direction, () => callback())
    }, [])
}