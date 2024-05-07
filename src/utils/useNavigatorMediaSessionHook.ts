import { playNextQueueTrack, playPrevQueueTrack } from "@/redux/slices/playerSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "preact/hooks";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export const useNavigatorMediaSessionHook = () => {
    const { seek, pause, togglePlayPause } = useGlobalAudioPlayer()

    const dispatch = useAppDispatch()

    const actionHandlers: [MediaSessionAction, MediaSessionActionHandler][] = [
        ['play', togglePlayPause],
        ['pause', togglePlayPause],
        ['previoustrack', () => dispatch(playPrevQueueTrack())],
        ['nexttrack', () => dispatch(playNextQueueTrack())],
        ['stop', pause],
        ['seekto', (details) => details.seekTime ? seek(details.seekTime) : undefined]
    ];

    // временный костыль
    document['kek'] = togglePlayPause

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                document['kek']()
            }
        };

        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, []);

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