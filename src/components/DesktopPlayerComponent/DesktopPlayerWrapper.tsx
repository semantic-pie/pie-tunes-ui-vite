import { FunctionalComponent } from "preact"
import { api } from "@/api"
import { DesktopPlayer, DesktopPlayerProps } from "./DesktopPlayer"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { playNextQueueTrack, playPrevQueueTrack } from "@/redux/slices/playerSlice"
import { useGlobalAudioPlayer } from "react-use-audio-player"
import { fetchForLike } from "@/redux/slices/userSlice"

export const DesktopPlayerWrapper: FunctionalComponent = () => {
    const dispatch = useAppDispatch()

    const { currentTrack, tracks: queue } = useAppSelector(state => state.player.queue)
    const {
        playing: isPlaying,
        togglePlayPause: onTogglePlayPause,
        setVolume,
        volume 
    } = useGlobalAudioPlayer()

    if (!currentTrack) return <></>

    const props: DesktopPlayerProps = {
        queue,
        volume,
        isPlaying,
        setVolume,
        currentTrack,
        onTogglePlayPause,
        onNextTrackClick: () => dispatch(playNextQueueTrack()),
        onPrevTrackClick: () => dispatch(playPrevQueueTrack()),
        onTrackLike: () => dispatch(fetchForLike({ track: currentTrack })),
        trackCoverUrl: api.urlForTrackCoverById({ id: currentTrack.musicAlbum.uuid }),
    }

    return <DesktopPlayer {...props} />
}
