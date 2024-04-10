import { useNavigate } from "@tanstack/react-router"
import { BubblePlayer, BubblePlayerProps } from "./BubblePlayer"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import { playNextQueueTrack, playPrevQueueTrack } from "@/redux/slices/playerSlice"
import { fetchForLike } from "@/redux/slices/userSlice"

export const BubblePlayerWrapper = () => {
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

    if (!currentTrack) return <></>

    const searchScopeTrack = useAppSelector(state => state.search.result.songs.find(t => t.uuid === currentTrack.uuid))
    const liked = searchScopeTrack ? searchScopeTrack.liked === true ? true : false : false

    const { volume, setVolume, playing, togglePlayPause } = useGlobalAudioPlayer()

    const props: BubblePlayerProps = {
        liked,
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
        onLikeClick: () => dispatch(fetchForLike({ track: currentTrack })),

    }

    return <BubblePlayer {...props} />
}

