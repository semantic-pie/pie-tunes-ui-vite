import { playNextQueueTrack, playPrevQueueTrack } from "@/redux/slices/playerSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "preact/hooks";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { useKeyPress } from "./useKeyPress";

export const useNavigatorMediaSessionHook = () => {
    const { seek, pause, play, togglePlayPause } = useGlobalAudioPlayer()

    const dispatch = useAppDispatch()

    const actionHandlers: [MediaSessionAction, MediaSessionActionHandler][] = [
        ['play', play],
        ['pause', pause],
        ['previoustrack', () => dispatch(playPrevQueueTrack())],
        ['nexttrack', () => dispatch(playNextQueueTrack())],
        ['stop', pause],
        ['seekto', (details) => details.seekTime ? seek(details.seekTime) : undefined]
    ];

    useKeyPress(() => {
        togglePlayPause()
    }, 'Space')

    useEffect(() => {
        for (const [action, handler] of actionHandlers) {
            try {
                navigator.mediaSession.setActionHandler(action, handler);
            } catch (error) {
                console.log(`The media session action "${action}" is not supported yet.`);
            }
        }
    })
}