import { next, prev, useAppDispatch } from "@/redux/store";
import { useEffect } from "preact/hooks";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export const useNavigatorMediaSessionHook = () => {
    const { seek, pause, play } = useGlobalAudioPlayer()

    const dispatch = useAppDispatch()

    const actionHandlers: [MediaSessionAction, MediaSessionActionHandler][] = [
        ['play', play],
        ['pause', pause],
        ['previoustrack', () => dispatch(prev())],
        ['nexttrack', () => dispatch(next())],
        ['stop', pause],
        ['seekto', (details) => details.seekTime ? seek(details.seekTime) : undefined]
    ];

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