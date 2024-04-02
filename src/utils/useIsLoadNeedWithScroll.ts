import { useSignal } from "@preact/signals"
import { useEffect, useRef } from "preact/hooks"

export const useIsLoadNeedScroll = (callback: () => void) => {
    const isLoadNeed = useSignal(false)
    const containerWithScrollRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        if (containerWithScrollRef.current) {
            const { scrollTop, scrollHeight } = containerWithScrollRef.current

            sessionStorage.setItem('scrollPosition', scrollTop + '')
            const trigger = 1 // play around with the trigger factor instead of fixed px
            if (scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
                isLoadNeed.value = true
            }
        }
    }

    useEffect(() => {
        if (isLoadNeed.value) {
            callback()
            setTimeout(() => {
                isLoadNeed.value = false
            }, 200)
        }
    }, [isLoadNeed.value])

    useEffect(() => {
        if (!containerWithScrollRef.current) return

        containerWithScrollRef.current.addEventListener('scroll', handleScroll)

        return () => {
            if (!containerWithScrollRef.current) return
            containerWithScrollRef.current.removeEventListener('scroll', handleScroll)
        }
    }, [])


    const sp = sessionStorage.getItem("scrollPosition")
    return {
        containerWithScrollRef,
        scrollPosition: sp ? parseInt(sp) : 0
    }
}