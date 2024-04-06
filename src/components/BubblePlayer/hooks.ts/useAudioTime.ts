import { useSignal } from "@preact/signals"
import { useEffect, useRef } from "preact/hooks"
import { useGlobalAudioPlayer } from "react-use-audio-player"

export const useAudioTime = () => {
    const frameRef = useRef<number>()
    const position = useSignal(0)

    const { getPosition } = useGlobalAudioPlayer()
    
    useEffect(() => {
        const animate = () => {
            position.value = getPosition()
            frameRef.current = requestAnimationFrame(animate)
        }

        frameRef.current = window.requestAnimationFrame(animate)

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }
        }
    }, [getPosition])
    
    return position.value;
}