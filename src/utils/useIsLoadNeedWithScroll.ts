import { useSignal } from "@preact/signals"
import { useEffect, useRef } from "preact/hooks"

export const useIsLoadNeedScroll = (callback: () => void) => {
    const isLoadNeed = useSignal(false)
    // const scrollPosition = useSignal(0)
    const scrollPosition = useRef(0)
    const containerWithScrollRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        console.log('scrool handle')
        if (containerWithScrollRef.current) {
            const { scrollTop, scrollHeight } = containerWithScrollRef.current

            scrollPosition.current = scrollTop
            const trigger = 1 // play around with the trigger factor instead of fixed px
            if (scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
                isLoadNeed.value = true
            }
        }
    }

    useEffect(() => {
        console.log('scrool change')
        
        if (isLoadNeed.value) {
            callback()
            setTimeout(() => {
                isLoadNeed.value = false
            }, 200)
        }
    }, [isLoadNeed.value])

    useEffect(() => {
        console.log('scrool init')
        if (!containerWithScrollRef.current) return

        containerWithScrollRef.current.addEventListener('scroll', handleScroll)

        return () => {
            if (!containerWithScrollRef.current) return
            containerWithScrollRef.current.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return {
        containerWithScrollRef,
        scrollPosition: scrollPosition.current
    }
}