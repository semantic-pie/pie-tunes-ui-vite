import { useNavigate } from "@tanstack/react-router"
import { BubblePlayer, BubblePlayerProps } from "./BubblePlayer"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import { playNextQueueTrack, playPrevQueueTrack } from "@/redux/slices/playerSlice"
import { fetchForLike, fetchForUnlike } from "@/redux/slices/userSlice"

export const BubblePlayerWrapper = () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

    if (!currentTrack) return <></>

    const searchScopeTrack = useAppSelector(state => state.search.result.songs.find(t => t.uuid === currentTrack.uuid))

    const { volume, setVolume, playing, togglePlayPause } = useGlobalAudioPlayer()

    const props: BubblePlayerProps = {
        liked: currentTrack.isLiked,
        volume,
        currentTrack,
        togglePlayPause,
        isPlaying: playing,
        setVolume: setVolume,
        onSwipeUp: () => nav({ to: '/player' }),
        onTrackClick: () => nav({ to: '/player/' + currentTrack.uuid }),
        isSearchScope: !!searchScopeTrack,
        onPlayNextClick: () => dispatch(playNextQueueTrack()),
        onPlayPrevClick: () => dispatch(playPrevQueueTrack()),
        onTrackLike: () =>  currentTrack.isLiked ? dispatch(fetchForUnlike({ track: currentTrack })) : dispatch(fetchForLike({ track: currentTrack })),
    }

    return <BubblePlayer {...props} />
}


